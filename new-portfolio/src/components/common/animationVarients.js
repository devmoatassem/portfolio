export const pageVariants = {
    initial: {
        opacity: 0,
        x: "-100vw",
        
    },
    animate: {
        opacity: 1,
        x: 0,
    
    },
    exit: {
        opacity: 0,
        x: "100vw",
        
    }
};

export const introVariants = {
    hidden:{
        opacity:0,
        y:20
    },
    visible:{
        opacity:1,
        y:0
    }
}

export const parentListVariants = {
    hidden:{
        opacity:0,
        y:20
    },
    visible:{
        opacity:1,
        y:0,
        transition:{
            delay: 0.5, 
            duration: 0.4,
            staggerChildren:3

        }
    }
}