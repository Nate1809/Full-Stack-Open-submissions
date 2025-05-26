const Notification = ({ message, isError }) => {
    if (message === null) {
    return null
    }

    const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }

    const successStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }

    const notificationStyle = successStyle
    if (isError){
        notificationStyle = errorStyle
    }
    return (
        <div style={notificationStyle}>
            {message}
        </div>
    )
}

export default Notification