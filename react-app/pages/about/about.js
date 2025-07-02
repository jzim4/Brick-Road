import React from 'react';
import Layout from '../layout.js';

export default function About() {
    return <Layout>
        <div id="aboutPageContainer">
            <TheSite />
            <AboutRondo />
            <TheTeam />
        </div>
    </Layout>
}

function TheSite() {
    return <div className="aboutComponent">
        <h3 className="aboutHeader">How to navigate the site</h3>
        <p>On the home page, there are two views: scrollable path and brick list. The full path is only available on larger devices.
            To navigate the path, you can hover over the bricks to see their messages, and click to learn more information about the purchaser.
            For the brick list, you are able to simply see all of the bricks expanded at once. This view is accessible on both smaller and larger devices.
            In either view, you can click the "filter" dropdown in order to show only bricks within a donor group or purchased by a specific purchaser.
            If you are interested in learning more about Rondo, in addition to this page, you can click on the panels on the full path in order to zoom in and read.
        </p>
    </div>
}

function TheTeam() {
    return <div className="aboutComponent">
        <h3 className="aboutHeader">A note from the site developer</h3>
        <p>This site was designed and built by sophomore Macalester College student, Jonah Zimmer. If you would like to see
            more of my work, please check out <a href="https://jzim4.github.io" target="_blank">my portfolio</a>!
        </p>
        <p>
            A special thanks to Professor Getiria Onsongo and Katie Frye for their support and guidance.
            Thank you to the generous donors who have purchased bricks and to the folks who work to keep the plaza a beautiful, welcoming space.
        </p>
    </div>
}

function AboutRondo() {
    return <div id="aboutRondoContainer">

        <h3 className="aboutHeader">A brief history of Rondo</h3>

        <p className="aboutParagraph">
            In the mid to late 1800s, Joseph and Josephine Rondeau left Fort Snelling after
            experiencing racial discrimination due to Josephine’s mixed white and indigenous heritage. The
            Rondeaus moved to an area close to downtown St. Paul, and the land took on an Anglicized
            version of their name: Rondo. The Rondo neighborhood was bordered by Selby Avenue to the
            south, University Avenue to the north, Lexington Parkway to the west, and Rice Street to the
            east. Though Joseph and Josephine moved away after four years, scores of immigrants
            continued to settle the Rondo area. French Canadian immigrants came in the nineteenth
            century, and later, German, Russian, Irish, Jewish, and Greek families made their home there.
            As Rondo’s European immigrant community became economically successful, many left
            the neighborhood. During the Great Migration (1910-1970), six million African Americans
            moved from the Deep South to the North to escape racial violence and pursue educational and
            financial opportunity. Unlike the explicit violence and intense prejudice of the Jim Crow South,
            racism in St. Paul took on more implicit forms through redlining, racial covenants & housing
            discrimination, employment & financial lending discrimination, and social norms. Rondo
            became one of the few areas where an increasing number of African American migrants could
            live in the Twin Cities.
        </p>
        <div className="aboutImgContainer floatLeft">
            <img className="aboutImg" src="/aboutImages/img1.jpg" width="1500" height="844" alt="flowers on ledge at the 2024 Brick Ceremony"></img>
            <p className="imgDescr">2024 Brick Ceremony, Image Credit: Katie Frye</p>
        </div>
        <p className="aboutParagraph">
            By the 1930s, Rondo was the heart of St. Paul’s African American community, with
            Rondo Street at its center. Journalist Roy Wilkins wrote of the main thoroughfare, “If New York
            has its Lenox Avenue, Chicago its State Street and Memphis its Beale Street, just as surely has
            St. Paul a riot of warmth, and color, and feeling and sound in Rondo Street.” Residents were
            Pullman Porters and maids, doctors and lawyers, skilled tradesmen and laborers, civil rights
            leaders and business-owners. A wide variety of social and economic groups were included in the
            Rondo neighborhood.
        </p>
        <div className="aboutImgContainer floatRight">
            <img className="aboutImg" src="/aboutImages/img3.jpg" width="1500" height="844" alt="audience listening to speaker at 2024 Brick Ceremony"></img>
            <p className="imgDescr">2024 Brick Ceremony, Image Credit: Katie Frye</p>
        </div>
        <p className="aboutParagraph">
            The tight-knit community was served by a number of churches, social clubs, and political
            organizations, including the oldest African American church in Minnesota, Pilgrim Baptist
            Church. Other notable institutions include the Hallie Q. Brown Community Center & Penumbra
            Theatre, the Sterling Club, the Credjawfawn Social Club, the St. Paul chapter of the Urban
            League, and the Minnesota chapter of the NAACP. Residents enjoyed three newspapers, the
            Appeal, the Northwestern Bulletin, and the St. Paul Recorder, which often advocated for civil
            rights advancements. Music and theater flourished, public schools were integrated, and it was
            not uncommon to engage in intercultural and interracial relationships. By 1950, 80% of St. Paul’s
            African American residents lived in Rondo.
        </p>
        <div className="aboutImgContainer floatLeft">
            <img className="aboutImg" src="/aboutImages/img2.jpg" width="1500" height="844" alt="two people sitting on the brick path"></img>
            <p className="imgDescr">2024 Brick Ceremony, Image Credit: Katie Frye</p>
        </div>
        <p className="aboutParagraph">
            In the 1930s and 40s, city residents and officials called for a highway linking the city
            centers of St. Paul and Minneapolis. Though a route running alongside railroad lines was
            proposed (the Northern Route), the city ultimately decided to route the highway along St.
            Anthony Avenue (the St. Anthony Route), right through the Rondo neighborhood. The Federal
            Highway Act of 1956 provided the necessary funding to construct the highway.
            Resistance from the Rondo neighborhood came quickly. Reverend Floyd Massey Jr.,
            Timothy Howard, and the Rondo-St. Anthony Improvement Association protested the proposed
            route. Their efforts led to I-94 being built below ground level, so that bridges could unite the
            two halves of the Rondo neighborhood. The construction of the Interstate led to the loss of
            seven hundred homes and three hundred businesses. One in every eight African Americans in
            St. Paul lost a home to I-94, and many businesses never recovered. There was a deliberate effort
            to minimize the value of resident’s homes. Some displaced residents took the lowball offer and
            moved away; others fought through the legal system; still, others sat, armed, on their front
            porches and waited for the police.
        </p>
        <p className="aboutParagraph">
            The area where Rondo once thrived is now known as the Summit-University
            neighborhood. Residents continue to commemorate the people, places, and memories of
            Rondo through organizations including the Rondo Avenue Inc., Rondo Commemorative Plaza
            (RCP), Rondo Center of Diverse Expressions (RCODE), ReConnect Rondo, and the Rondo
            Roundtable. Events such as Rondo Days, Juneteenth, and the Rondo Block Party are celebrated
            annually. Rondo’s legacy continues to live on through memory, celebration, and efforts to
            reunite the neighborhood.
        </p>

        <h3 className="aboutHeader">About the Rondo Commemorative Plaza (2018-Present)</h3>
        <div className="aboutImgContainer floatRight">
            <img className="aboutImg" src="/aboutImages/img4.jpg" width="2500" height="1667" alt="Rondo Commemorative Plaza bricks and panels"></img>
            <p className="imgDescr">Rondo Commemorative Plaza<br></br>Image Credit: Morgan Sheff</p>
        </div>
        <p className="aboutParagraph">
            In 2013, the two-story building at 820 Concordia Street went up in flames. Over the years, the
            building had served as a VFW post, a dance parlor, a coffee shop, and a restaurant. Most
            importantly, it had been a Rondo landmark, a reminder of the historically-black neighborhood
            that once thrived where I-94 now sits. Marvin Anderson organized a wake for the building, and
            soon, he had a vision for the empty lot.
        </p>
        <div className="aboutImgContainer floatLeft">
            <img className="aboutImg" src="/aboutImages/img5.jpg" width="2500" height="1667" alt="Rondo Commemorative Plaza bricks and panels illuminated at night"></img>
            <p className="imgDescr">Rondo Commemorative Plaza<br></br>Image Credit: Morgan Sheff</p>
        </div>
        <p className="aboutParagraph">
            In 2016, Anderson and Floyd Smaller (both co-founders of the Rondo Days celebration), worked
            with architects from 4RM+ULA and Ten x Ten to create plans for a memorial plaza. Opened in
            July 2018, the Rondo Commemorative Plaza (RCP) is the first public memorial to the Black
            neighborhoods destroyed by interstate highways. The plaza includes a 26-panel History Wall
            that tells the story of Rondo, a commemorative brick path, eighteen community chimes, and a
            30-ft lighted tower that is visible to anyone driving on I-94. The adjacent building is home to the
            Rondo Center of Diverse Expressions (RCODE), which offers an indoor space for events,
            preserves a small research collection, and provides administrative responsibility for the plaza.
            Rondo residents, visitors, community members, and organizations are invited to purchase bricks
            along the commemorative brick path. Bricks can recognize an address, a family member or
            friend, a memory, a business, or anything else held near and dear. Brick purchasers are
            celebrated during our annual “Every Brick Counts” Ceremony in September, where each
            participant is given time to share about their story. For more information on RCODE’s
            commemorative brick program, please email Katie at katie@rcodemn.org.
        </p>
    </div>
}