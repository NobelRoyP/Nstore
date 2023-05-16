import React from 'react'
import './Css/Body.css'

function Body() {
    return (
        <>
            <div className='Home'>
                <div className='Card'>
                    <div className='Image'>
                        <img src='https://5.imimg.com/data5/SELLER/Default/2022/10/DG/BH/LE/23328273/whatsapp-image-2022-10-06-at-23-41-44-1--500x500.jpeg' />
                        <div className='Details'>
                            <p className='Description'>Converse</p>
                            <i className='fa-solid fa-shopping-cart'></i>
                        </div>
                    </div>
                </div>
                <div className='Card'>
                    <div className='Image'>
                        <img src='data:image/jpeg;base64,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' />
                        <div className='Details'>
                            <p className='Description'>Puma</p>
                            <i className='fa-solid fa-shopping-cart'></i>
                        </div>
                    </div>
                </div>

                <div className='Card'>
                    <div className='Image'>
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuCNs0y6LSi0g3hfTx3bnpAU-W5d5ycKNN5w&usqp=CAU' />
                        <div className='Details'>
                            <p className='Description'>Converse</p>
                            <i className='fa-solid fa-shopping-cart'></i>
                        </div>
                    </div>
                </div>

                <div className='Card'>
                    <div className='Image'>
                        <img src='https://5.imimg.com/data5/SELLER/Default/2022/10/DG/BH/LE/23328273/whatsapp-image-2022-10-06-at-23-41-44-1--500x500.jpeg' />
                        <div className='Details'>
                            <p className='Description'>Converse</p>
                            <i className='fa-solid fa-shopping-cart'></i>
                        </div>
                    </div>
                </div>

                <div className='Card'>
                    <div className='Image'>
                        <img src='https://5.imimg.com/data5/SELLER/Default/2022/10/DG/BH/LE/23328273/whatsapp-image-2022-10-06-at-23-41-44-1--500x500.jpeg' />
                        <div className='Details'>
                            <p className='Description'>Converse</p>
                            <i className='fa-solid fa-shopping-cart'></i>
                        </div>
                    </div>
                </div>

                <div className='Card'>
                    <div className='Image'>
                        <img src='https://5.imimg.com/data5/SELLER/Default/2022/10/DG/BH/LE/23328273/whatsapp-image-2022-10-06-at-23-41-44-1--500x500.jpeg' />
                        <div className='Details'>
                            <p className='Description'>Converse</p>
                            <i className='fa-solid fa-shopping-cart'></i>
                        </div>
                    </div>
                </div>

                <div className='Card'>
                    <div className='Image'>
                        <img src='https://5.imimg.com/data5/SELLER/Default/2022/10/DG/BH/LE/23328273/whatsapp-image-2022-10-06-at-23-41-44-1--500x500.jpeg' />
                        <div className='Details'>
                            <p className='Description'>Converse</p>
                            <i className='fa-solid fa-shopping-cart'></i>
                        </div>
                    </div>
                </div>

                <div className='Card'>
                    <div className='Image'>
                        <img src='https://5.imimg.com/data5/SELLER/Default/2022/10/DG/BH/LE/23328273/whatsapp-image-2022-10-06-at-23-41-44-1--500x500.jpeg' />
                        <div className='Details'>
                            <p className='Description'>Converse</p>
                            <i className='fa-solid fa-shopping-cart'></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Body