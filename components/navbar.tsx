import dynamic from 'next/dynamic';


const DynamicComponent = dynamic(
    () => import("./dynamic/navbar"),
    {ssr:false}
)

export default function Hydrated () {
    return <DynamicComponent />
}