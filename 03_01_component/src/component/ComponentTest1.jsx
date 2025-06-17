
export default function UseComponent1(){
    return (
        <>
            <div>
                <h1>UseComponent1에서 반환한 JSX</h1>
            </div>
            <UseComponent4 />
        </>
    )
}

function UseComponent4(){
    return (
        <div>
            <h1>UseComponent4에서 반환한 JSX</h1>
        </div>
    )
}