import React, { useState } from 'react';

export default function Contact() {
    const [formType, setFormType] = useState(''); // 'edit', 'purchase', or 'comments'

    const handleFormTypeChange = (event) => {
        setFormType(event.target.value);
    };

    return (
        <div>
            <h1>Contact Us</h1>
            <p>Please select an option below.</p>

            <form>
                <fieldset>
                    <legend>What would you like to do?</legend>
                    <div>
                        <input
                            type="radio"
                            id="editBrick"
                            name="formType"
                            value="edit"
                            checked={formType === 'edit'}
                            onChange={handleFormTypeChange}
                        />
                        <label htmlFor="editBrick">Edit an existing brick</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="purchaseBrick"
                            name="formType"
                            value="purchase"
                            checked={formType === 'purchase'}
                            onChange={handleFormTypeChange}
                        />
                        <label htmlFor="purchaseBrick">Purchase a new one</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="shareComments"
                            name="formType"
                            value="comments"
                            checked={formType === 'comments'}
                            onChange={handleFormTypeChange}
                        />
                        <label htmlFor="shareComments">Share other comments</label>
                    </div>
                </fieldset>
            </form>

            {formType === 'edit' && (
                <form>
                    <h2>Edit an Existing Brick</h2>
                    <p>Please provide the following information to help us locate your brick and make the necessary corrections.</p>
                    
                    <div>
                        <label htmlFor="purchaserName">Purchaser Name:</label>
                        <input type="text" id="purchaserName" name="purchaserName" required />
                    </div>
                    
                    <div>
                        <label htmlFor="panel">Panel Number:</label>
                        <input type="text" id="panel" name="panel" placeholder="e.g., Panel 1" required />
                    </div>
                    
                    <div>
                        <label htmlFor="errorExplanation">Explanation of Error:</label>
                        <textarea id="errorExplanation" name="errorExplanation" rows="5" required></textarea>
                    </div>
                    
                    <div>
                        <label htmlFor="comment">Additional Comments:</label>
                        <textarea id="comment" name="comment" rows="3" placeholder="Any additional comments or information you'd like to share..."></textarea>
                    </div>
                    
                    <button type="submit">Submit Correction Request</button>
                </form>
            )}

            {formType === 'purchase' && (
                <div>
                    <h2>Purchase a New Brick</h2>
                    <p>
                        We are delighted that you're interested in purchasing a brick! 
                        Please proceed to our brick purchasing page to customize and buy your brick.
                    </p>
                    {/* <a href="/bricks/purchase">Go to Purchase Page</a>  // Assuming a route exists */}
                </div>
            )}

            {formType === 'comments' && (
                <form>
                    <h2>Share Other Comments</h2>
                    <p>We'd love to hear from you! Please share any comments, suggestions, or feedback you have.</p>
                    
                    <div>
                        <label htmlFor="comment">Your Comments:</label>
                        <textarea id="comment" name="comment" rows="5" required placeholder="Please share your thoughts, suggestions, or any other comments you'd like to share with us..."></textarea>
                    </div>
                    
                    <button type="submit">Submit Comments</button>
                </form>
            )}
        </div>
    );
}