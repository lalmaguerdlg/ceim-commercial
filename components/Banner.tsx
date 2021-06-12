import { useFilterSlots, useSlot } from "./util/hooks";


export function BannerTitle({ children }) {
    return <h2>{children}</h2>
}

export function Banner({ children }) {
    const bodySlot = useFilterSlots(children);
    const linksSlot = useSlot('links', children);
    return (
        <section className="banner_area">
            <div className="banner_inner d-flex align-items-center">
                <div className="overlay"></div>
                <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                    <div className="banner_content text-center">
                        {bodySlot}
                        <div className="page_link">
                            {linksSlot}
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
    )
}