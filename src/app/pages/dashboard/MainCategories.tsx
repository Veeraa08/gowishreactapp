import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Responsive } from '../../../_metronic/sliders/responsive';
import Carousel from 'react-multi-carousel';

export default function MainCategories(mainCategories: any) {
  const responsive = Responsive
  return (
    <>
      <div className='row gx-5 gx-xl-8 mb-5 mb-xl-8'>
        <div className='col-xl-12'>
          <div className='card card-flush h-xl-100'>
            <div className='card-header pt-7'>
              <h3 className='card-title align-items-start flex-row'>
                <span className='card-label fw-bold text-dark'>Category</span>
                <span className='text-gray-400 mt-1 fw-semibold fs-6'>Category list</span>
              </h3>
            </div>
            <div className='card-body pt-7'>
              <div className='row flex g-5 g-xl-9 mb-5 mb-xl-9'>
                <Carousel
                  responsive={responsive}
                  swipeable={true}
                  showDots={true}
                  autoPlay={true}
                  infinite={true}
                  autoPlaySpeed={3000}
                  removeArrowOnDeviceType={['tablet', 'mobile']}
                >
                  {mainCategories.mainCategories?.map((category: any, i:number) => {
                    return (
                      <>
                        <div className='col-sm-3 mb-3 mb-sm-0 w-100 pb-5 ps-2 pe-3' key={i}>
                        <div className="position-relative ">
                            <div>
                                <img src={category?.thumbnail} alt="" className="bgi-position-center bgi-no-repeat bgi-size-cover h-200px card-rounded" width={'100%'} />
                                <button className="btn btn-icon position-absolute center-play-button top-40" data-kt-element="list-play-button">
                                  <FontAwesomeIcon icon={faPlay} className="text-white" size="2x" />
                                </button>
                            </div>
                            <div className="m-2">
                                <a className="text-gray-800 text-hover-primary fs-3 fw-bold d-block mb-2" href="index.html">{category?.category_name}</a>
                                {/* <span className="fw-bold fs-6 text-gray-400 d-block lh-1">NEW MEMORIES START</span> */}
                            </div>
                        </div>
                        </div>
                      </>
                    )
                  })}
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
