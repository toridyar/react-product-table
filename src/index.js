import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const productData = [
    { category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football" },
    { category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball" },
    { category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball" },
    { category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch" },
    { category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5" },
    { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" }
];

class ProductRow extends React.Component {
    render() {
        const productData = this.props.productData;
        const rows = productData.map((product) => {
            if (this.props.catName !== product.category) return null;
            if (this.props.inStockOnly && product.stocked === false) return null;
            if (this.props.filterText && product.name.indexOf(this.props.filterText) === -1) return null;
            return (
                <tr className={product.stocked ? null : 'red'}>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                </tr>
            );
        }
        );
        return rows;
    }
}

class ProductCategoryRow extends React.Component {
    render() {
        return (
            <tr>
                <th>{this.props.catName}</th>
            </tr>
        );
    }
}

class ProductTable extends React.Component {
    render() {
        const uniqueCategories = [];
        this.props.productData.map(product => {
            if (this.props.filterText && product.name.indexOf(this.props.filterText) === -1) return null;
            if (uniqueCategories.indexOf(product.category) === -1 && (!this.props.inStockOnly || (this.props.inStockOnly && product.stocked === true))) {
                uniqueCategories.push(product.category)
            }
            return;
        });
        const categories = uniqueCategories.map((category) => {
            return (<>
                <ProductCategoryRow catName={category} />
                <ProductRow productData={this.props.productData} catName={category} inStockOnly={this.props.inStockOnly} filterText={this.props.filterText} />
            </>
            );
        }
        );
        return (
            <table>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
                {categories}
            </table>
        );
    }
}

class SearchBar extends React.Component {
    render() {
        return (
            <form>
                <div>
                    <label>
                        <input name="filterText" type="text" placeholder="Search..." value={this.props.filterText} onChange={this.props.onChange} />
                    </label>
                </div>
                <div>
                    <label>
                        <input name="inStockOnly" type="checkbox" checked={this.props.inStockOnly} onChange={this.props.onChange} />
                    Only show products in stock
                </label>
                </div>
            </form>
        );
    }
}

class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            inStockOnly: false
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <div>
                <div>
                    < SearchBar filterText={this.state.filterText} inStockOnly={this.state.inStockOnly} onChange={this.handleChange} />
                </div>
                <div>
                    < ProductTable productData={productData} filterText={this.state.filterText} inStockOnly={this.state.inStockOnly} />
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <FilterableProductTable productData={productData} />,
    document.getElementById('root')
);