import compose from 'lodash.flowright';

import { BranchFiber } from '../types';

import { findFiber } from '.';

const updateBranch = (matching: boolean) => (fiber: BranchFiber | null) =>
    fiber && fiber.stateNode.setState(state => ({ ...state, matching }));

/*
 * This(These) branch(es) is currently being enabled.
 * Find the sibling branch(es) with truthy `matching` state.
 * Disable that(those) branch(es).
 */
export const disableBranches = (needsToDisable: (fiber: BranchFiber) => boolean) => compose(
    updateBranch(false),
    findFiber(needsToDisable),
);

/*
 * This branch is currently being disabled.
 * Find the first sibling `ElseIf` branch with truthy `condition` props, or the `Else` branch.
 * Enable that branch.
 */
export const enableBranches = (needsToEnable: (fiber: BranchFiber) => boolean) => compose(
    updateBranch(true),
    findFiber(needsToEnable),
);
