import { ReactType } from 'react';

import { ElseIf, Else, Case, Default } from '../components';
import { BranchFiber, Fiber } from '../types';
import { areComponentsEqual } from '../utils';

const isBranchFiber = <P extends {} = any>(component?: ReactType<P>) => (fiber: Fiber): fiber is BranchFiber<P> =>
    component
        ? areComponentsEqual(component)(fiber.type)
        : [ElseIf, Else, Case, Default].some(areComponentsEqual(fiber.type));

export default isBranchFiber;
