import { PureComponent } from 'react';

import { BranchProps } from '../components/Branch';

import { Fiber } from '.';

export type BranchInstance<P> = PureComponent<P, Pick<BranchProps, 'matching'>>;

export interface BranchFiber<P = any> extends Fiber {
    stateNode: BranchInstance<P>;
}
