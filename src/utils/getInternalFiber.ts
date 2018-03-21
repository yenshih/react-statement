import { Component } from 'react';

export const getInternalFiber = (instance: Component) => {
    const internalFiberKey = Object.keys(instance).find(key => key.startsWith('_reactInternalFiber'));
    if (!internalFiberKey) {
        return;
    }
    return (instance as any)[internalFiberKey];
};
