var homeViewModel = {
    homePageTemplateUrl: "js/views/partials/home_view.ejs",
    containerId: "app_container",
    navBar: {
        img: { 
            src: "images/favicon_drawing.png",
            width: "50",
            height: "50",
            alt: "League Logo"
        },
        leagueName: "RMWLL",
        navPills:[
            {
                name: "Home",
                id: "navButton1",
                toggle: true,
                active: true //active default when page render
    
            },
            {
                name: "Team",
                id: "navButton2",
                toggle: true,
                active: false
    
            }
        ],

        
    },
    homePageContent:{
        aside:{
            title: "Results",
            items:[
                {
                    teams: "School of Mines vs Denver",
                    finalScore: "Final Score: 15-9"

                },
                {
                    teams: "Utah Valley vs Denver",
                    finalScore: "Final Score: 22-3"

                },
                {
                    teams: "Airforce Academy vs Wyoming",
                    finalScore: "Final Score: 12-10"

                }
            ]

        }
    }
}
export default homeViewModel;