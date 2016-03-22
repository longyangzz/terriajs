'use strict';

import React from 'react';
import ObserveModelMixin from '../ObserveModelMixin';
import classNames from 'classnames';
import addedByUser from '../../Core/addedByUser';

// Individual dataset
const DataCatalogItem = React.createClass({
    mixins: [ObserveModelMixin],

    propTypes: {
        item: React.PropTypes.object.isRequired,
        viewState: React.PropTypes.object.isRequired
    },

    renderIconClass(item) {
        if (item.isEnabled) {
            if (item.isLoading) {
                return 'btn--loading-on-map';
            }
            return 'btn--remove-from-map';
        }
        return 'btn--add-to-map';
    },

    toggleEnable() {
        this.props.item.toggleEnabled();
        // set preview as well
        this.props.viewState.viewCatalogItem(this.props.item);
        // mobile switch to nowvewing
        this.props.viewState.switchMobileView(this.props.viewState.mobileViewOptions.preview);
    },

    setPreviewedItem() {
        this.props.viewState.viewCatalogItem(this.props.item);
        // mobile switch to nowvewing
        this.props.viewState.switchMobileView(this.props.viewState.mobileViewOptions.preview);
    },

    isSelected() {
        return addedByUser(this.props.item) ?
            this.props.viewState.userDataPreviewedItem === this.props.item :
            this.props.viewState.previewedItem === this.props.item;
    },

    render() {
        const item = this.props.item;
        return (
            <li className={classNames('clearfix', {'is-previewed': this.isSelected()})}>
                <button onClick={this.setPreviewedItem} className={`btn ${item.isMappable ? 'btn--catalog-item' : 'btn--service-item'}`}>{item.name}</button>
                {item.isMappable && <button onClick={this.toggleEnable} title="add to map" className={'btn btn--catalog-item--action ' + (this.renderIconClass(item))}></button>}
            </li>
        );
    }
});

module.exports = DataCatalogItem;
