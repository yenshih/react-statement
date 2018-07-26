import compose from 'lodash.flowright';

import { BranchFiber } from '../types';

import { findFiber, iterateFibers } from '.';

const updateBranch = (matching: boolean) => (fiber: BranchFiber) =>
    fiber.stateNode.setState(state => ({ ...state, matching }));

const disableBranch = updateBranch(false);
const enableBranch = updateBranch(true);

/*
 * This(These) branch(es) is currently being enabled.
 * Find the sibling branch(es) with truthy `matching` state.
 * Disable that(those) branch(es).
 */
export const disableBranches = (needsToDisable: (fiber: BranchFiber) => boolean) => compose(
    iterateFibers({
        criterion: needsToDisable,
        iteratee: disableBranch,
    }),
    findFiber(needsToDisable),
);

/*
 * This branch is currently being disabled.
 * Find the first sibling `ElseIf` branch with truthy `condition` props, or the `Else` branch.
 * Enable that branch.
 */
export const enableBranches = (needsToEnable: (fiber: BranchFiber) => boolean) => compose(
    iterateFibers({
        criterion: needsToEnable,
        iteratee: enableBranch,
    }),
    findFiber(needsToEnable),
);
