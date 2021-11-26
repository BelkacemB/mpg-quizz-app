import React from 'react';
import CalculatorAnim from './img/tactic.gif'
import { usePromiseTracker } from 'react-promise-tracker';

export const LoadingIndicator = () => {
    const { promiseInProgress } = usePromiseTracker();

    return (
        <div>
            {promiseInProgress &&
            <div>
            <p className="block italic text-center text-2xl mx-6">Optimisation...</p>
            <br/>
                    <img
                        alt=""
                        src={CalculatorAnim}
                        width="250"
                        className="block m-auto rounded-full"
                    />
            </div>
            }
        </div>
    )
}
