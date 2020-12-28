import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(
    () => import('../../components/dynamic/upload'),
    {ssr:false}
)

export default function Hydrated() {
    return <DynamicComponent />
}