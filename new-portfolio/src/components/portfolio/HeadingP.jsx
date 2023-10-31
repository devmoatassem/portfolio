
function HeadingP({topPadding ='mt-14'}) {
    return (
        <section className="relative">
            <div className="main-bg absolute py left-0 top-0 h-full w-full"></div>
            <div className="max-w-screen-xl container  mx-auto">
                <div className="flex w-full items-center justify-center">
                    <div className={topPadding}>
                        <div className="py-16 px-4 mx-auto max-w-screen-md text-center">
                            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-white">Projects</h2>
                            <p className="font-light text-gray-500 md:text-xl">Passionate about diverse projects, many open-source. Join me, explore, and enhance. Your input fuels progress, and I welcome fresh ideas. Let's innovate together.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeadingP;