import { ReactType } from 'react';

export const enum TypeOfWork {
    IndeterminateComponent,
    FunctionalComponent,
    ClassComponent,
    HostRoot,
    HostPortal,
    HostComponent,
    HostText,
    /* eslint-disable camelcase */
    CallComponent_UNUSED,
    CallHandlerPhase_UNUSED,
    ReturnComponent_UNUSED,
    /* eslint-enable camelcase */
    Fragment,
    Mode,
    ContextConsumer,
    ContextProvider,
    ForwardRef,
    Profiler,
    PlaceholderComponent,
}

export interface RefObject {
    current: any;
}

export type ExpirationTime = number;

export const enum UpdateTag {
    UpdateState,
    ReplaceState,
    ForceUpdate,
    CaptureUpdate,
}

export interface Update<State> {
    expirationTime: ExpirationTime;

    tag: UpdateTag;
    payload: any;
    callback: () => any | null;

    next: Update<State> | null;
    nextEffect: Update<State> | null;
}

export interface UpdateQueue<State> {
    expirationTime: ExpirationTime;
    baseState: State;

    firstUpdate: Update<State> | null;
    lastUpdate: Update<State> | null;

    firstCapturedUpdate: Update<State> | null;
    lastCapturedUpdate: Update<State> | null;

    firstEffect: Update<State> | null;
    lastEffect: Update<State> | null;

    firstCapturedEffect: Update<State> | null;
    lastCapturedEffect: Update<State> | null;
}

export const enum TypeOfMode {
    NoContext = 0b000,
    AsyncMode = 0b001,
    StrictMode = 0b010,
    ProfileMode = 0b100,
}

export const enum TypeOfSideEffect {
    NoEffect = 0b00000000000,
    PerformedWork = 0b00000000001,
    Placement = 0b00000000010,
    Update = 0b00000000100,
    PlacementAndUpdate = 0b00000000110,
    Deletion = 0b00000001000,
    ContentReset = 0b00000010000,
    Callback = 0b00000100000,
    DidCapture = 0b00001000000,
    Ref = 0b00010000000,
    Snapshot = 0b00100000000,
    LifecycleEffectMask = 0b00110100100,
    HostEffectMask = 0b00111111111,
    Incomplete = 0b01000000000,
    ShouldCapture = 0b10000000000,
}

export interface Fiber {

    /**
     * Tag identifying the type of fiber.
     */
    tag: TypeOfWork;

    /**
     * Unique identifier of this child.
     */
    key: string | null;

    /**
     * The function/class/module associated with this fiber.
     */
    type: ReactType;

    /**
     * The local state associated with this fiber.
     */
    stateNode: any;

    /**
     * The Fiber to return to after finishing processing this one.
     * This is effectively the parent, but there can be multiple parents (two)
     * so this is only the parent of the thing we're currently processing.
     * It is conceptually the same as the return address of a stack frame.
     */
    return: Fiber | null;

    /**
     * Singly Linked List Tree Structure.
     */
    child: Fiber | null;

    /**
     * Singly Linked List Tree Structure.
     */
    sibling: Fiber | null;

    index: number;

    /**
     * The ref last used to attach this node.
     */
    ref: (((handle: any) => void) & {_stringRef?: string}) | RefObject | null;

    pendingProps: any;

    /**
     * The props used to create the output.
     */
    memoizedProps: any;

    /**
     * A queue of state updates and callbacks.
     */
    updateQueue: UpdateQueue<any> | null;

    /**
     * The state used to create the output.
     */
    memoizedState: any;

    /**
     * Bitfield that describes properties about the fiber and its subtree. E.g.
     * the AsyncMode flag indicates whether the subtree should be async-by-
     * default. When a fiber is created, it inherits the mode of its
     * parent. Additional flags can be set at creation time, but after that the
     * value should remain unchanged throughout the fiber's lifetime, particularly
     * before its child fibers are created.
     */
    mode: TypeOfMode;

    /**
     * Effect.
     */
    effectTag: TypeOfSideEffect;

    /**
     * Singly linked list fast path to the next fiber with side-effects.
     */
    nextEffect: Fiber | null;

    /**
     * The first and last fiber with side-effect within this subtree. This allows
     * us to reuse a slice of the linked list when we reuse the work done within
     * this fiber.
     */
    firstEffect: Fiber | null;

    /**
     * The first and last fiber with side-effect within this subtree. This allows
     * us to reuse a slice of the linked list when we reuse the work done within
     * this fiber.
     */
    lastEffect: Fiber | null;

    /**
     * Represents a time in the future by which this work should be completed.
     * This is also used to quickly determine if a subtree has no pending changes.
     */
    expirationTime: ExpirationTime;

    /**
     * This is a pooled version of a Fiber. Every fiber that gets updated will
     * eventually have a pair. There are cases when we can clean up pairs to save
     * memory if we need to.
     */
    alternate: Fiber | null;

    /**
     * Time spent rendering this Fiber and its descendants for the current update.
     * This tells us how well the tree makes use of sCU for memoization.
     * This field is only set when the enableProfilerTimer flag is enabled.
     */
    actualDuration?: number;

    /**
     * If the Fiber is currently active in the "render" phase,
     * This marks the time at which the work began.
     * This field is only set when the enableProfilerTimer flag is enabled.
     */
    actualStartTime?: number;

    /**
     * Duration of the most recent render time for this Fiber.
     * This value is not updated when we bailout for memoization purposes.
     * This field is only set when the enableProfilerTimer flag is enabled.
     */
    selfBaseDuration?: number;

    /**
     * Sum of base times for all descedents of this Fiber.
     * This value bubbles up during the "complete" phase.
     * This field is only set when the enableProfilerTimer flag is enabled.
     */
    treeBaseDuration?: number;
}
