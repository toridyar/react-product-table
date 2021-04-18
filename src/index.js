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
            if (uniqueCategories.indexOf(product.category) === -1) {
                uniqueCategories.push(product.category)
            }
            return;
        });
        const categories = uniqueCategories.map((category) => {
            return (<>
                <ProductCategoryRow catName={category} />
                <ProductRow productData={this.props.productData} catName={category} />
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
                        <input type="text" placeholder="Search..." />
                    </label>
                </div>
                <div>
                    <label>
                        <input type="checkbox" />
                    Only show products in stock
                </label>
                </div>
            </form>
        );
    }
}

class FilterableProductTable extends React.Component {
    render() {
        return (
            <div>
                <div>
                    < SearchBar />
                </div>
                <div>
                    < ProductTable productData={productData} />
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <FilterableProductTable productData={productData} />,
    document.getElementById('root')
);