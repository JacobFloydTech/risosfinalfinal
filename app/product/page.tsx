
import MissionGrid from "./mission";
import BentoGrid from "./bentoGrid";

import View3DModel from "./view3DModel";
import { getServerSession } from "next-auth";
import ComingSoon from "./comingSoon";
import ProductContent from "./productContent";


export default async function ProductPage() {
    const session = await getServerSession();
    if (!session) {

        return <div><ComingSoon /></div>
    }
    else {return (
        <div><ProductContent/></div>
    )}
}


 