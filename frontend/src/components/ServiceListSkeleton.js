import React from 'react';
import '../App.css';

function ServiceListSkeleton() {
    return (
        <div className="service-list">
        {[...Array(3)].map((_, index) => (
            <div key={index} className="service-item-skeleton">
            <div className="skeleton-line title"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line short"></div>
            </div>
        ))}
        </div>
    );
}

export default ServiceListSkeleton;