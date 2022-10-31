const Hero = ({user}) => {
    return (
        <>
            <div className="hero" style={{ backgroundImage: `url("https://img.freepik.com/free-photo/sports-tools_53876-138077.jpg?w=2000")`, height: `75vh` }}>
                <div className="hero-overlay bg-gradient-to-br from-gray-500 "></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-lg">
                        <h1 className="mb-5 text-5xl font-bold">Welcome to BSport {user.name}</h1>
                        <p className="mb-5">Start your journey to your fitness today!</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hero;
