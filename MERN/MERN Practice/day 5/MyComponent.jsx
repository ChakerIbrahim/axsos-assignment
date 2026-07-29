const MyComponent = props => {
    const onClickhandler = (e, value) => {
        alert(value);
    }
    return props.movies.map((item, index)=> {
        return <button onClick={onClickhandler}>{e,item}</button>
    });
}