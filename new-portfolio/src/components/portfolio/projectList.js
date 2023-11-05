import p1 from '../../assets/images/projects/CoinTrack1_result.webp'
import p2 from '../../assets/images/projects/Stocks1_result.webp'
import p3 from '../../assets/images/projects/Screening1_result.webp'
import p4 from '../../assets/images/projects/Portfolio1_result.webp'
import p5 from '../../assets/images/projects/Aeye1_result.webp'
import p6 from '../../assets/images/projects/DataShuttle_result.webp'

const proj_list = [
    {
        id: '10',
        title: 'CoinTrack',
        pic: p1,
        description: "A personal finance tracker built using Python-Flask, HTML, CSS, Bootstrap, and SQLite as the database consists of two main pages. Let's discuss each one in detail.",
        tech_stack: ['Flask', 'Python', 'Sqlite3', 'CSS'],
        github: 'https://github.com/devmoatassem/CoinTrack',
        live: null,

    },
    {
        id: '11',
        title: 'Stocks Manager',
        pic: p2,
        description: 'A web app built using Flask that allows users to check stock prices, buy and sell stocks, and track the history of their purchases. Users can also view their owned stocks on the dashboard.',
        tech_stack: ['Flask', 'IEX Api', 'Sqlite3'],
        github: 'https://github.com/devmoatassem/Stocks-Manager.git',
        live: 'https://flask-production-0d59.up.railway.app/'
    },
    {
        id: '12',
        title: 'COVID Scanner',
        pic: p3,
        description: 'A web app that allows users to view information about COVID-19 and preventive measures for COVID-19. It also allows users to check if they have any symptoms of COVID-19.',
        tech_stack: ['Bootstrap', 'HTML', 'CSS'],
        github: 'https://github.com/devmoatassem/Screening-App',
        live: 'https://devmoatassem.github.io/Screening-App/'

    },
    {
        id: '13',
        title: 'Portfolio',
        pic: p4,
        description: 'My personal portfolio website built using ReactJS and TailwindCSS.',
        tech_stack: ['ReactJS', 'TailwindCSS'],
        github: 'https://github.com/devmoatassem/portfolio',
        live: 'https://moatassam.com/'
    },
    {
        id: '14',
        title: 'Aeye Mobile App',
        pic: p5,
        description: 'Aeye is a mobile application that helps blind people send emergency alerts and share live location. It also helps attendents track the location of the blind person and view the pictures of their surroundings.',
        tech_stack: ['Flutter', 'Firebase'],
        github: 'https://github.com/devmoatassem/FYP-aEYE',
        live: null,
    },
    {
        id: '15',
        title: 'Data Shuttle',
        pic: p6,
        description: 'A Desktop app that allows users to send and receive files between users on the same network using sockets.',
        tech_stack: ['Python', 'Tkinter'],
        github: 'https://github.com/devmoatassem/DataShuttle',
        live: null
    }
]

export default proj_list;