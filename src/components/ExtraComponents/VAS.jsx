import React from 'react'

const VAS = ({vas}) => {
    return (
        <div className="vas">
            {
                vas.includes('QUICK_DELIVERY') &&
                <div className='quick-delivery'>QD</div>
            }
            {
                vas.includes('FULL_NAME') &&
                <div className='full-name'>FN</div>
            }
        </div>
    )
}

export default VAS