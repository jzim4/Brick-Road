import React from 'react';

const EditForm = ({ formData, handleInputChange, handleSubmit, errors }) => (
    <form onSubmit={handleSubmit} noValidate>
        <p>Please provide the following information to help us locate your brick and make the necessary corrections.</p>
        
        <div>
            <label htmlFor="purchaserName">
                Purchaser Name: <span aria-label="required">*</span>
            </label>
            <input type="text" id="purchaserName" name="purchaserName" value={formData.purchaserName} onChange={handleInputChange} aria-required="true" />
            {errors.purchaserName && (
                <div id="purchaserName-error" className="error-message" role="alert">
                    {errors.purchaserName}
                </div>
            )}
        </div>
        
        <div>
            <label htmlFor="panel">
                Panel Number: <span aria-label="required">*</span>
            </label>
            <input type="text" id="panel" name="panel" value={formData.panel} onChange={handleInputChange} aria-required="true" />
            {errors.panel && (
                <div id="panel-error" className="error-message" role="alert">
                    {errors.panel}
                </div>
            )}
        </div>
        
        <div>
            <label htmlFor="errorExplanation">
                Explanation of Error: <span aria-label="required">*</span>
            </label>
            <textarea id="errorExplanation" name="errorExplanation" rows="5" value={formData.errorExplanation} onChange={handleInputChange} aria-required="true"></textarea>
            {errors.errorExplanation && (
                <div id="errorExplanation-error" className="error-message" role="alert">
                    {errors.errorExplanation}
                </div>
            )}
        </div>
        
        <div>
            <label htmlFor="editComment">Additional Comments:</label>
            <textarea id="editComment" name="comment" rows="3" value={formData.comment} onChange={handleInputChange}></textarea>
        </div>
        
        <button type="submit">
            Submit Correction Request
        </button>
    </form>
);

export default EditForm; 