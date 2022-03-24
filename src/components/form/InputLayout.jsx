import React from 'react'
import PropTypes from 'prop-types';

export const InputLayout = (props) => {
  return (
    <div className="flex flex-col pt-4 mb-6">
    <div className="flex relative ">
        <span className='flex-1 appearance-none italic w-full py-4 px-2 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'>{props.name}</span>

        {props.children}
    </div>
    </div>
  )
}

InputLayout.propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
}

