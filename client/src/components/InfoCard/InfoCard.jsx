import "./InfoCard.scss";
const InfoCard = () => {
    return (<>
        <div className="card col-6">
            <div className="body">
                <div className='title'>ornek bir story</div>
                <div className='desc'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ut.</div>
                <div className='tags'>
                    <span className='tag'>tag1</span>
                    <span className='tag'>tag1</span>
                    <span className='tag'>tag1</span>
                </div>
            </div>
        </div>
    </>)
}
export default InfoCard