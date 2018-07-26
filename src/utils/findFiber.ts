import { Fiber } from '../types';

import { iterateFibers } from '.';

const findFiber = (criterion: (fiber: Fiber) => boolean) => iterateFibers({ criterion: fiber => !criterion(fiber) });

export default findFiber;
