import React from 'react';
import { CircularProgress } from '@mui/material';
import { usePromiseTracker } from 'react-promise-tracker';

export const LoadingIndicator = () => {
    const { promiseInProgress } = usePromiseTracker();

    return (
        <div>
            {promiseInProgress &&
                <div>
                    <CircularProgress />
                </div>
            }
        </div>
    )
}
