import React, { Component } from 'react';
import Nav from '../../Component/Nav/Nav';
import NavBottom from '../../Component/NavBottom/SearchBar';
import Header from '../ProductList/Componenet/Header';
import Product from '../ProductList/Componenet/Product';
import PriceFilter from './Componenet/PriceFilter/PriceFilter';
import SidebarFilter from './Componenet/sidebar/SidebarFilter';
import SidebarfilterColletcion from './sidebarCollection/SidebarfilterCollection';
import Footer from '../../Component/Footer/Footer';
import { api } from '../../config/api';
import './ProductList.scss';
import './Componenet/PriceFilter/PriceFilter.scss';

class ProductList extends Component {
  constructor() {
    super();
    this.state = {
      filters: [],
      hideFilter: true,
      filterText: 'HIDE FILTERS',
      showPriceFilter: true,
      openedPriceFilter: true,
      priceFilter: 'NEWEST',
      products: [],
      isChecked: false,
      sortList: {
        NEWEST: 'mice_list',
        HighLow: 'price_high_low',
        LowHigh: 'price_low_high',
      },
      sortName: {
        NEWEST: 'NEWEST',
        HighLow: 'Price: High to Low',
        LowHigh: 'Price: Low to High',
      },
      filterAddress: '',
      sortBy: 'NEWEST',
    };

    this.goToDetail = this.goToDetail.bind(this);
  }

  componentDidMount() {
    fetch(`http://10.58.5.137:8000/products/mice_list`)
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          products: result.mice_list,
        });
      });
  }

  handleFetch() {
    const { filterAddress } = this.state;
    let filterQueryString =
      filterAddress === 'mice_list' ? '' : `\?sort\=${filterAddress}`;
    fetch(`http://10.58.5.137:8000/products/mice_list${filterQueryString}`)
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          products: result.mice_list,
        });
      });
  }

  hideFilter() {
    const { hideFilter } = this.state;
    this.setState({
      hideFilter: !hideFilter,
      filterText: hideFilter ? 'SHOW FILTERS' : 'HIDE FILTERS',
    });
  }

  goToDetail(e) {
    const { id } = e.target;
    this.props.history.push(`/ProductDetails/${id}`);
  }

  handlePriceFilter() {
    this.setState({
      showPriceFilter: !this.state.showPriceFilter,
    });
  }

  // callbackFunction = () => {
  //   const { sortList, filterAddress, sortName, sortBy } = this.state;
  //   setTimeout(() => {
  //     this.setState({
  //       sortBy: sortName[e.target.id],
  //     });
  //   }, 0);
  // };

  showPriceFilter = (e) => {
    const { sortList, filterAddress, sortName, sortBy } = this.state;
    this.setState(
      {
        filterAddress: sortList[e.target.id],
        sortBy: sortName[e.target.id],
        // sortBy: sortName[sortList[e.target.id]],
      },
      () => this.handleFetch()
      // this.callbackFunction()
    );
  };
  render() {
    const {
      filterText,
      hideFilter,
      showPriceFilter,
      priceFilter,
      isChecked,
      products,
      sortList,
      filterAddress,
      sortBy,
    } = this.state;

    return (
      <div className='productList'>
        <Nav />
        <NavBottom />
        <Header />
        <div className='filterProductContainer'>
          <div className='filterSorter'>
            <button onClick={() => this.hideFilter()}>
              <img
                src='https://www.logitech.com/images/icons/filter-toggle.svg'
                alt=''
              />
              <span className='hideFilterButton'>{filterText}</span>
            </button>
            <button onClick={() => this.handlePriceFilter()}>
              <img
                src='https://www.logitech.com/images/icons/down-arrow.svg'
                alt=''
              />
              <p>SORTY BY: {sortBy}</p>
              {!showPriceFilter ? (
                <PriceFilter
                  sortList={sortList}
                  filterAddress={filterAddress}
                  showPriceFilter={this.showPriceFilter}
                />
              ) : null}
            </button>
          </div>
          <div className='filterContainer'>
            <div className='filterSidebar'>
              {hideFilter ? (
                <div className='collection'>
                  <SidebarFilter />
                </div>
              ) : null}
            </div>
            <Product products={this.products} goToDetail={this.goToDetail} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default ProductList;
