import React from 'react'

const AmbientGlow = () => {
    return (
        <div className="absolute inset-0 pointer-events-none">
            <div
                className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle,  #26094c 0%, transparent 70%)',
                }}
            />
            <div
                className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, #8844ff 0%, transparent 70%)',
                }}
            />
        </div>
    )
}

export default AmbientGlow