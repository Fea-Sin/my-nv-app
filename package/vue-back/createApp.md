# CreateApp

CreateApp 作为 vue 的启动函数，返回一个应用实例

**看一个例子**

```js
const HelloVue = {
  data() {
    return {
      message: "Hello Vue!",
    };
  },
};

Vue.createApp(HelloVue).mount("#hello");
```

看源码`createApp`里面都干了啥

```ts
export const createApp = ((...args) => {
  const app = ensureRenderer().createApp(...args);

  if (__DEV__) {
    injectNativeTagCheck(app);
    injectCompilerOptionsCheck(app);
  }

  const { mount } = app;
  app.mount = (containerOrSelector: Element | ShadowRoot | string): any => {
    const container = normalizeContainer(containerOrSelector);
    if (!container) return;

    const component = app._component;
    if (!isFunction(component) && !component.render && !component.template) {
      // __UNSAFE__
      // Reason: potential execution of JS expressions in in-DOM template.
      // The user must make sure the in-DOM template is trusted. If it's
      // rendered by the server, the template should not contain any user data.
      component.template = container.innerHTML;
      // 2.x compat check
      if (__COMPAT__ && __DEV__) {
        for (let i = 0; i < container.attributes.length; i++) {
          const attr = container.attributes[i];
          if (attr.name !== "v-cloak" && /^(v-|:|@)/.test(attr.name)) {
            compatUtils.warnDeprecation(
              DeprecationTypes.GLOBAL_MOUNT_CONTAINER,
              null
            );
            break;
          }
        }
      }
    }

    // clear content before mounting
    container.innerHTML = "";
    const proxy = mount(container, false, container instanceof SVGElement);
    if (container instanceof Element) {
      container.removeAttribute("v-cloak");
      container.setAttribute("data-v-app", "");
    }
    return proxy;
  };

  return app;
}) as CreateAppFunction<Element>;
```

我们可以看到重点于`ensureRenderer`

```ts
function ensureRenderer() {
  return (
    renderer ||
    (renderer = createRenderer<Node, Element | ShadowRoot>(rendererOptions))
  );
}
```

我们看到是调用了`createRenderer`

```ts
export function createRenderer<
  HostNode = RendererNode,
  HostElement = RendererElement
>(options: RendererOptions<HostNode, HostElement>) {
  return baseCreateRenderer<HostNode, HostElement>(options);
}
```

`baseCreateRender`是关键

```ts
import { createAppAPI, CreateAppFunction } from "./apiCreateApp";

function baseCreateRenderer(
  options: RendererOptions,
  createHydrationFns?: typeof createHydrationFunctions
): any {
  const {
    insert: hostInsert,
    remove: hostRemove,
    patchProp: hostPatchProp,
    createElement: hostCreateElement,
    createText: hostCreateText,
    createComment: hostCreateComment,
    setText: hostSetText,
    setElementText: hostSetElementText,
    parentNode: hostParentNode,
    nextSibling: hostNextSibling,
    setScopeId: hostSetScopeId = NOOP,
    cloneNode: hostCloneNode,
    insertStaticContent: hostInsertStaticContent,
  } = options;

  const mountComponent: MountComponentFn = (
    initialVNode,
    container,
    anchor,
    parentComponent,
    parentSuspense,
    isSVG,
    optimized
  ) => {
    // 2.x compat may pre-creaate the component instance before actually
    // mounting
    const compatMountInstance =
      __COMPAT__ && initialVNode.isCompatRoot && initialVNode.component;
    const instance: ComponentInternalInstance =
      compatMountInstance ||
      (initialVNode.component = createComponentInstance(
        initialVNode,
        parentComponent,
        parentSuspense
      ));

    if (__DEV__ && instance.type.__hmrId) {
      registerHMR(instance);
    }

    if (__DEV__) {
      pushWarningContext(initialVNode);
      startMeasure(instance, `mount`);
    }

    // inject renderer internals for keepAlive
    if (isKeepAlive(initialVNode)) {
      (instance.ctx as KeepAliveContext).renderer = internals;
    }

    // resolve props and slots for setup context
    if (!(__COMPAT__ && compatMountInstance)) {
      if (__DEV__) {
        startMeasure(instance, `init`);
      }
      setupComponent(instance);
      if (__DEV__) {
        endMeasure(instance, `init`);
      }
    }

    // setup() is async. This component relies on async logic to be resolved
    // before proceeding
    if (__FEATURE_SUSPENSE__ && instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);

      // Give it a placeholder if this is not hydration
      // TODO handle self-defined fallback
      if (!initialVNode.el) {
        const placeholder = (instance.subTree = createVNode(Comment));
        processCommentNode(null, placeholder, container!, anchor);
      }
      return;
    }

    setupRenderEffect(
      instance,
      initialVNode,
      container,
      anchor,
      parentSuspense,
      isSVG,
      optimized
    );

    if (__DEV__) {
      popWarningContext();
      endMeasure(instance, `mount`);
    }
  };

  const updateComponent = (n1: VNode, n2: VNode, optimized: boolean) => {
    const instance = (n2.component = n1.component)!;
    if (shouldUpdateComponent(n1, n2, optimized)) {
      if (
        __FEATURE_SUSPENSE__ &&
        instance.asyncDep &&
        !instance.asyncResolved
      ) {
        // async & still pending - just update props and slots
        // since the component's reactive effect for render isn't set-up yet
        if (__DEV__) {
          pushWarningContext(n2);
        }
        updateComponentPreRender(instance, n2, optimized);
        if (__DEV__) {
          popWarningContext();
        }
        return;
      } else {
        // normal update
        instance.next = n2;
        // in case the child component is also queued, remove it to avoid
        // double updating the same child component in the same flush.
        invalidateJob(instance.update);
        // instance.update is the reactive effect.
        instance.update();
      }
    } else {
      // no update needed. just copy over properties
      n2.component = n1.component;
      n2.el = n1.el;
      instance.vnode = n2;
    }
  };

  const setupRenderEffect: SetupRenderEffectFn = (
    instance,
    initialVNode,
    container,
    anchor,
    parentSuspense,
    isSVG,
    optimized
  ) => {
    const componentUpdateFn = () => {
      if (!instance.isMounted) {
        let vnodeHook: VNodeHook | null | undefined;
        const { el, props } = initialVNode;
        const { bm, m, parent } = instance;
        const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);

        effect.allowRecurse = false;
        // beforeMount hook
        if (bm) {
          invokeArrayFns(bm);
        }
        // onVnodeBeforeMount
        if (
          !isAsyncWrapperVNode &&
          (vnodeHook = props && props.onVnodeBeforeMount)
        ) {
          invokeVNodeHook(vnodeHook, parent, initialVNode);
        }
        if (
          __COMPAT__ &&
          isCompatEnabled(DeprecationTypes.INSTANCE_EVENT_HOOKS, instance)
        ) {
          instance.emit("hook:beforeMount");
        }
        effect.allowRecurse = true;

        if (el && hydrateNode) {
          // vnode has adopted host node - perform hydration instead of mount.
          const hydrateSubTree = () => {
            if (__DEV__) {
              startMeasure(instance, `render`);
            }
            instance.subTree = renderComponentRoot(instance);
            if (__DEV__) {
              endMeasure(instance, `render`);
            }
            if (__DEV__) {
              startMeasure(instance, `hydrate`);
            }
            hydrateNode!(
              el as Node,
              instance.subTree,
              instance,
              parentSuspense,
              null
            );
            if (__DEV__) {
              endMeasure(instance, `hydrate`);
            }
          };

          if (isAsyncWrapperVNode) {
            (initialVNode.type as ComponentOptions).__asyncLoader!().then(
              // note: we are moving the render call into an async callback,
              // which means it won't track dependencies - but it's ok because
              // a server-rendered async wrapper is already in resolved state
              // and it will never need to change.
              () => !instance.isUnmounted && hydrateSubTree()
            );
          } else {
            hydrateSubTree();
          }
        } else {
          if (__DEV__) {
            startMeasure(instance, `render`);
          }
          const subTree = (instance.subTree = renderComponentRoot(instance));
          if (__DEV__) {
            endMeasure(instance, `render`);
          }
          if (__DEV__) {
            startMeasure(instance, `patch`);
          }
          patch(
            null,
            subTree,
            container,
            anchor,
            instance,
            parentSuspense,
            isSVG
          );
          if (__DEV__) {
            endMeasure(instance, `patch`);
          }
          initialVNode.el = subTree.el;
        }
        // mounted hook
        if (m) {
          queuePostRenderEffect(m, parentSuspense);
        }
        // onVnodeMounted
        if (
          !isAsyncWrapperVNode &&
          (vnodeHook = props && props.onVnodeMounted)
        ) {
          const scopedInitialVNode = initialVNode;
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook!, parent, scopedInitialVNode),
            parentSuspense
          );
        }
        if (
          __COMPAT__ &&
          isCompatEnabled(DeprecationTypes.INSTANCE_EVENT_HOOKS, instance)
        ) {
          queuePostRenderEffect(
            () => instance.emit("hook:mounted"),
            parentSuspense
          );
        }

        // activated hook for keep-alive roots.
        // #1742 activated hook must be accessed after first render
        // since the hook may be injected by a child keep-alive
        if (initialVNode.shapeFlag & ShapeFlags.COMPONENT_SHOULD_KEEP_ALIVE) {
          instance.a && queuePostRenderEffect(instance.a, parentSuspense);
          if (
            __COMPAT__ &&
            isCompatEnabled(DeprecationTypes.INSTANCE_EVENT_HOOKS, instance)
          ) {
            queuePostRenderEffect(
              () => instance.emit("hook:activated"),
              parentSuspense
            );
          }
        }
        instance.isMounted = true;

        if (__DEV__ || __FEATURE_PROD_DEVTOOLS__) {
          devtoolsComponentAdded(instance);
        }

        // #2458: deference mount-only object parameters to prevent memleaks
        initialVNode = container = anchor = null as any;
      } else {
        // updateComponent
        // This is triggered by mutation of component's own state (next: null)
        // OR parent calling processComponent (next: VNode)
        let { next, bu, u, parent, vnode } = instance;
        let originNext = next;
        let vnodeHook: VNodeHook | null | undefined;
        if (__DEV__) {
          pushWarningContext(next || instance.vnode);
        }

        // Disallow component effect recursion during pre-lifecycle hooks.
        effect.allowRecurse = false;

        if (next) {
          next.el = vnode.el;
          updateComponentPreRender(instance, next, optimized);
        } else {
          next = vnode;
        }

        // beforeUpdate hook
        if (bu) {
          invokeArrayFns(bu);
        }
        // onVnodeBeforeUpdate
        if ((vnodeHook = next.props && next.props.onVnodeBeforeUpdate)) {
          invokeVNodeHook(vnodeHook, parent, next, vnode);
        }
        if (
          __COMPAT__ &&
          isCompatEnabled(DeprecationTypes.INSTANCE_EVENT_HOOKS, instance)
        ) {
          instance.emit("hook:beforeUpdate");
        }

        effect.allowRecurse = true;

        // render
        if (__DEV__) {
          startMeasure(instance, `render`);
        }
        const nextTree = renderComponentRoot(instance);
        if (__DEV__) {
          endMeasure(instance, `render`);
        }
        const prevTree = instance.subTree;
        instance.subTree = nextTree;

        if (__DEV__) {
          startMeasure(instance, `patch`);
        }
        patch(
          prevTree,
          nextTree,
          // parent may have changed if it's in a teleport
          hostParentNode(prevTree.el!)!,
          // anchor may have changed if it's in a fragment
          getNextHostNode(prevTree),
          instance,
          parentSuspense,
          isSVG
        );
        if (__DEV__) {
          endMeasure(instance, `patch`);
        }
        next.el = nextTree.el;
        if (originNext === null) {
          // self-triggered update. In case of HOC, update parent component
          // vnode el. HOC is indicated by parent instance's subTree pointing
          // to child component's vnode
          updateHOCHostEl(instance, nextTree.el);
        }
        // updated hook
        if (u) {
          queuePostRenderEffect(u, parentSuspense);
        }
        // onVnodeUpdated
        if ((vnodeHook = next.props && next.props.onVnodeUpdated)) {
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook!, parent, next!, vnode),
            parentSuspense
          );
        }
        if (
          __COMPAT__ &&
          isCompatEnabled(DeprecationTypes.INSTANCE_EVENT_HOOKS, instance)
        ) {
          queuePostRenderEffect(
            () => instance.emit("hook:updated"),
            parentSuspense
          );
        }

        if (__DEV__ || __FEATURE_PROD_DEVTOOLS__) {
          devtoolsComponentUpdated(instance);
        }

        if (__DEV__) {
          popWarningContext();
        }
      }
    };

    // create reactive effect for rendering
    const effect = new ReactiveEffect(
      componentUpdateFn,
      () => queueJob(instance.update),
      instance.scope // track it in component's effect scope
    );

    const update = (instance.update = effect.run.bind(effect) as SchedulerJob);
    update.id = instance.uid;
    // allowRecurse
    // #1801, #2043 component render effects should allow recursive updates
    effect.allowRecurse = update.allowRecurse = true;

    if (__DEV__) {
      effect.onTrack = instance.rtc
        ? (e) => invokeArrayFns(instance.rtc!, e)
        : void 0;
      effect.onTrigger = instance.rtg
        ? (e) => invokeArrayFns(instance.rtg!, e)
        : void 0;
      // @ts-ignore (for scheduler)
      update.ownerInstance = instance;
    }

    update();
  };

  const unmountComponent = (
    instance: ComponentInternalInstance,
    parentSuspense: SuspenseBoundary | null,
    doRemove?: boolean
  ) => {
    if (__DEV__ && instance.type.__hmrId) {
      unregisterHMR(instance);
    }

    const { bum, scope, update, subTree, um } = instance;

    // beforeUnmount hook
    if (bum) {
      invokeArrayFns(bum);
    }

    if (
      __COMPAT__ &&
      isCompatEnabled(DeprecationTypes.INSTANCE_EVENT_HOOKS, instance)
    ) {
      instance.emit("hook:beforeDestroy");
    }

    // stop effects in component scope
    scope.stop();

    // update may be null if a component is unmounted before its async
    // setup has resolved.
    if (update) {
      // so that scheduler will no longer invoke it
      update.active = false;
      unmount(subTree, instance, parentSuspense, doRemove);
    }
    // unmounted hook
    if (um) {
      queuePostRenderEffect(um, parentSuspense);
    }
    if (
      __COMPAT__ &&
      isCompatEnabled(DeprecationTypes.INSTANCE_EVENT_HOOKS, instance)
    ) {
      queuePostRenderEffect(
        () => instance.emit("hook:destroyed"),
        parentSuspense
      );
    }
    queuePostRenderEffect(() => {
      instance.isUnmounted = true;
    }, parentSuspense);

    // A component with async dep inside a pending suspense is unmounted before
    // its async dep resolves. This should remove the dep from the suspense, and
    // cause the suspense to resolve immediately if that was the last dep.
    if (
      __FEATURE_SUSPENSE__ &&
      parentSuspense &&
      parentSuspense.pendingBranch &&
      !parentSuspense.isUnmounted &&
      instance.asyncDep &&
      !instance.asyncResolved &&
      instance.suspenseId === parentSuspense.pendingId
    ) {
      parentSuspense.deps--;
      if (parentSuspense.deps === 0) {
        parentSuspense.resolve();
      }
    }

    if (__DEV__ || __FEATURE_PROD_DEVTOOLS__) {
      devtoolsComponentRemoved(instance);
    }
  };

  const render: RootRenderFunction = (vnode, container, isSVG) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
      }
    } else {
      patch(
        container._vnode || null,
        vnode,
        container,
        null,
        null,
        null,
        isSVG
      );
    }
    flushPostFlushCbs();
    container._vnode = vnode;
  };

  let hydrate: ReturnType<typeof createHydrationFunctions>[0] | undefined;
  let hydrateNode: ReturnType<typeof createHydrationFunctions>[1] | undefined;
  if (createHydrationFns) {
    [hydrate, hydrateNode] = createHydrationFns(
      internals as RendererInternals<Node, Element>
    );
  }

  // 中间省略2千行

  return {
    render,
    hydrate,
    createApp: createAppAPI(render, hydrate),
  };
}
```

`baseCreateRender`包含内容很丰富，包含`mountComponent`、`updateComponent`、`setupRenderEffect`、
`unmountComponent`等

从源码中我们看到`baseCreateRender`最终返回`render`、`hydrate`、`createApp`

`createApp` 调用的是`createAppAPI`函数

```ts
export function createAppAPI<HostElement>(
  render: RootRenderFunction,
  hydrate?: RootHydrateFunction
): CreateAppFunction<HostElement> {
  return function createApp(rootComponent, rootProps = null) {
    if (rootProps != null && !isObject(rootProps)) {
      __DEV__ && warn(`root props passed to app.mount() must be an object.`);
      rootProps = null;
    }

    // APP 配置
    const context = createAppContext();
    const installedPlugins = new Set();

    let isMounted = false;

    const app: App = (context.app = {
      _uid: uid++,
      _component: rootComponent as ConcreteComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,

      version,

      get config() {
        return context.config;
      },

      set config(v) {
        if (__DEV__) {
          warn(
            `app.config cannot be replaced. Modify individual options instead.`
          );
        }
      },

      use(plugin: Plugin, ...options: any[]) {
        if (installedPlugins.has(plugin)) {
          __DEV__ && warn(`Plugin has already been applied to target app.`);
        } else if (plugin && isFunction(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install(app, ...options);
        } else if (isFunction(plugin)) {
          installedPlugins.add(plugin);
          plugin(app, ...options);
        } else if (__DEV__) {
          warn(
            `A plugin must either be a function or an object with an "install" ` +
              `function.`
          );
        }
        return app;
      },

      mixin(mixin: ComponentOptions) {
        if (__FEATURE_OPTIONS_API__) {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          } else if (__DEV__) {
            warn(
              "Mixin has already been applied to target app" +
                (mixin.name ? `: ${mixin.name}` : "")
            );
          }
        } else if (__DEV__) {
          warn("Mixins are only available in builds supporting Options API");
        }
        return app;
      },

      component(name: string, component?: Component): any {
        if (__DEV__) {
          validateComponentName(name, context.config);
        }
        if (!component) {
          return context.components[name];
        }
        if (__DEV__ && context.components[name]) {
          warn(
            `Component "${name}" has already been registered in target app.`
          );
        }
        context.components[name] = component;
        return app;
      },

      directive(name: string, directive?: Directive) {
        if (__DEV__) {
          validateDirectiveName(name);
        }

        if (!directive) {
          return context.directives[name] as any;
        }
        if (__DEV__ && context.directives[name]) {
          warn(
            `Directive "${name}" has already been registered in target app.`
          );
        }
        context.directives[name] = directive;
        return app;
      },

      mount(
        rootContainer: HostElement,
        isHydrate?: boolean,
        isSVG?: boolean
      ): any {
        if (!isMounted) {
          const vnode = createVNode(
            rootComponent as ConcreteComponent,
            rootProps
          );
          // store app context on the root VNode.
          // this will be set on the root instance on initial mount.
          vnode.appContext = context;

          // HMR root reload
          if (__DEV__) {
            context.reload = () => {
              render(cloneVNode(vnode), rootContainer, isSVG);
            };
          }

          if (isHydrate && hydrate) {
            hydrate(vnode as VNode<Node, Element>, rootContainer as any);
          } else {
            render(vnode, rootContainer, isSVG);
          }
          isMounted = true;
          app._container = rootContainer;
          // for devtools and telemetry
          (rootContainer as any).__vue_app__ = app;

          if (__DEV__ || __FEATURE_PROD_DEVTOOLS__) {
            app._instance = vnode.component;
            devtoolsInitApp(app, version);
          }

          return getExposeProxy(vnode.component!) || vnode.component!.proxy;
        } else if (__DEV__) {
          warn(
            `App has already been mounted.\n` +
              `If you want to remount the same app, move your app creation logic ` +
              `into a factory function and create fresh app instances for each ` +
              `mount - e.g. \`const createMyApp = () => createApp(App)\``
          );
        }
      },

      unmount() {
        if (isMounted) {
          render(null, app._container);
          if (__DEV__ || __FEATURE_PROD_DEVTOOLS__) {
            app._instance = null;
            devtoolsUnmountApp(app);
          }
          delete app._container.__vue_app__;
        } else if (__DEV__) {
          warn(`Cannot unmount an app that is not mounted.`);
        }
      },

      provide(key, value) {
        if (__DEV__ && (key as string | symbol) in context.provides) {
          warn(
            `App already provides property with key "${String(key)}". ` +
              `It will be overwritten with the new value.`
          );
        }
        // TypeScript doesn't allow symbols as index type
        // https://github.com/Microsoft/TypeScript/issues/24587
        context.provides[key as string] = value;

        return app;
      },
    });

    if (__COMPAT__) {
      installAppCompatProperties(app, context, render);
    }

    return app;
  };
}
```

在`createAppAPI` 看到了眼熟的方法
`use()` `mixin()` `component()` `directive()` `mount()` `unmount()` `provide()`

`createAppContext`是默认 APP 配置

```ts
export function createAppContext(): AppContext {
  return {
    app: null as any,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: undefined,
      warnHandler: undefined,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
```

到这里，整个`createApp`流程就结束了

你可能会有很多疑问

- 模版是怎么编译的？

- 生命周期是怎么挂载的？

- 组件是怎么注册的？

- 响应式怎么做到的？
