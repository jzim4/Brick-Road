import React, { useState } from 'react';
import Header from '../header.js';
import Footer from '../footer.js';

const FormTypeSelector = ({ formType, handleFormTypeChange }) => (
    <fieldset>
        <legend>What would you like to do?</legend>
        <div role="radiogroup" aria-labelledby="form-type-legend" className="formOptionsContainer">
            <div>
                <input type="radio" id="editBrick" name="formType" value="edit" checked={formType === 'edit'} onChange={handleFormTypeChange} />
                <label htmlFor="editBrick">Correct an error on a brick on the site</label>
            </div>
            <div>
                <input type="radio" id="purchaseBrick" name="formType" value="purchase" checked={formType === 'purchase'} onChange={handleFormTypeChange} />
                <label htmlFor="purchaseBrick">Purchase a new brick</label>
            </div>
            <div>
                <input type="radio" id="shareComments" name="formType" value="comments" checked={formType === 'comments'} onChange={handleFormTypeChange} />
                <label htmlFor="shareComments">Share other comments or feedback</label>
            </div>
        </div>
    </fieldset>
);

const EditForm = ({ formData, handleInputChange, handleSubmit, errors }) => (
    <form onSubmit={handleSubmit} noValidate>
        <h2>Edit an Existing Brick</h2>
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

const PurchaseInfo = () => (
    <div>
        <h2>Purchase a New Brick</h2>
        <p>
            We are delighted that you're interested in purchasing a brick! 
            Please proceed to our brick purchasing page to customize and buy your brick.
        </p>
        {/* <a href="/bricks/purchase">Go to Purchase Page</a>  // Assuming a route exists */}
    </div>
);

const CommentsForm = ({ formData, handleInputChange, handleSubmit, errors }) => (
    <form onSubmit={handleSubmit} noValidate>
        <h2>Share Other Comments</h2>
        <p>We'd love to hear from you! Please share any comments, suggestions, or feedback you have.</p>
        
        <div>
            <label htmlFor="comment">
                Your Comments: <span aria-label="required">*</span>
            </label>
            <textarea id="comment" name="comment" rows="5" value={formData.comment} onChange={handleInputChange} aria-required="true"></textarea>
            {errors.comment && (
                <div id="comment-error" className="error-message" role="alert">
                    {errors.comment}
                </div>
            )}
        </div>
        
        <button type="submit">
            Submit Comments
        </button>
    </form>
);

export default function Contact() {
    const [formType, setFormType] = useState(''); // 'edit', 'purchase', or 'comments'
    const [formData, setFormData] = useState({
        purchaserName: '',
        panel: '',
        errorExplanation: '',
        comment: ''
    });
    const [errors, setErrors] = useState({});

    const handleFormTypeChange = (event) => {
        setFormType(event.target.value);
        // Clear form data when switching between forms
        setFormData({
            purchaserName: '',
            panel: '',
            errorExplanation: '',
            comment: ''
        });
        setErrors({});
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (formType === 'edit') {
            if (!formData.purchaserName.trim()) {
                newErrors.purchaserName = 'Purchaser name is required';
            }
            if (!formData.panel.trim()) {
                newErrors.panel = 'Panel number is required';
            }
            if (!formData.errorExplanation.trim()) {
                newErrors.errorExplanation = 'Error explanation is required';
            }
        } else if (formType === 'comments') {
            if (!formData.comment.trim()) {
                newErrors.comment = 'Comments are required';
            }
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            // Handle form submission here
            console.log('Form submitted:', { formType, formData });
            alert('Thank you for your submission! We will get back to you soon.');
        }
    };

    return (
        <div className="contactPage">
            <Header />
            <main className="contactContent">
                <h1>Contact Us</h1>
                <p>Please select an option below.</p>

                <FormTypeSelector 
                    formType={formType}
                    handleFormTypeChange={handleFormTypeChange} 
                />

                {formType === 'edit' && (
                    <EditForm 
                        formData={formData}
                        handleInputChange={handleInputChange}
                        handleSubmit={handleSubmit}
                        errors={errors}
                    />
                )}

                {formType === 'purchase' && <PurchaseInfo />}

                {formType === 'comments' && (
                    <CommentsForm 
                        formData={formData}
                        handleInputChange={handleInputChange}
                        handleSubmit={handleSubmit}
                        errors={errors}
                    />
                )}
            </main>
            <Footer />
        </div>
    );
}