import { ElseIf, Else } from '../components';
import { BranchFiber } from '../types';
import { isBranchFiber } from '../utils';

export const needsToDisable = (fiber: BranchFiber) => fiber.stateNode.state.matching;

export const needsToEnable = (fiber: BranchFiber) =>
    isBranchFiber(ElseIf)(fiber) && fiber.stateNode.props.condition || isBranchFiber(Else)(fiber);
