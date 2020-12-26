import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(
    () => import('../../components/dynamic/slider-upload'),
    {ssr:false}
)

export default function Hydrated() {
    return (
        <div style={{marginTop: '80px'}}>
            <DynamicComponent />
        </div>
    )
}