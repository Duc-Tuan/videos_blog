function Image({ src, width, height = 'auto' }) {
    return ( <>
        <img width={width} height={height} src={src} alt=""/>
    </> );
}

export default Image;