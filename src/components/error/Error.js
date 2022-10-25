import img from './error.gif';

const Error = () => {
    return (
        <div style={{'display': 'flex', 
                     'flexDirection':'column',
                     'fontWeight': 'bold',
                     'fontSize': '18px',
                     'lineHeight': '29px'}}>
            <img src={img} alt="Error" style={{margin:' 0 auto', 
            height:'250px', 
            width:'250px', 
            display:'block'}}/>
            <span style={{color: '#9F0013', textAlign: 'center'}}>Something went wrong. Please try reloading the page</span>
        </div>
    )
}

export default Error;