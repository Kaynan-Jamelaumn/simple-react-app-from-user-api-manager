import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext'; // Import the authentication context to access user data
import {
  FormWrapper,
  FormContainer,
  Form,
  Input,
  Button,
  Title,
  FileInputContainer,
  FileInputText,
  FileInputLabel,
  FileInputButton,
  FormLabel,
  Image,
  ImageContainer,
} from '../../styles/GlobalStyles'; // Import styled components for the form

import defaultAvatar from  '../../utils/default-avatar.png';
import { update } from '../../services/api';
import { useCustomToast } from '../../utils/customToasts';

export default function Profile() {
  const showToast = useCustomToast();
  const [error, setError] = React.useState('');

  const { user, updateUser } = useAuth(); // Get the current user data and updateUser function from the authentication context
  const [isEditing, setIsEditing] = useState(false); // State to track if the profile is in edit mode
  const [formData, setFormData] = useState({
    ...user,
    birthDate: user.birthDate ? new Date(user.birthDate).toISOString().split('T')[0] : '', // Format birth date to 'YYYY-MM-DD' for the date input
  });
  const [originalData, setOriginalData] = useState({
    ...user,
    birthDate: user.birthDate ? new Date(user.birthDate).toISOString().split('T')[0] : '', // Store the original user data to revert changes if needed
  });
  const [profilePicture, setProfilePicture] = useState(user.profilePicture || defaultAvatar); // State for the profile picture, defaulting to a placeholder if none exists

  // Handle changes in input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // Update the form data with the new input value
  };

  // Handle file input changes (profile picture)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result); // Set the profile picture to the uploaded image
      };
      reader.readAsDataURL(file); // Read the file as a data URL
      setFormData({ ...formData, profilePicture: file }); // Update form data with the new file
    }
  };

  // Enable edit mode
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Cancel editing and revert to original data
  const handleCancel = () => {
    setFormData(originalData); // Reset form data to the original user data
    setProfilePicture(user.profilePicture || defaultAvatar); // Reset profile picture
    setIsEditing(false); // Exit edit mode
  };

  // Save changes (currently logs data to the console)
  const handleSave = async () => {
    try {
      // Reset errors
      setError({ email: '', username: '' });
  
      // Validate email and username
      let hasError = false;
      const newError = { email: '', username: '' };
  
      if (!formData.email) {
        newError.email = 'Email must be filled.';
        hasError = true;
      }
      if (!formData.username) {
        newError.username = 'Username must be filled.';
        hasError = true;
      }
  
      // If there are errors, set them and exit
      if (hasError) {
        setError(newError);
        showToast('error', 'Please fill in all required fields.');
        return;
      }
  
      // Call the update function with the form data
      const updatedUser = await update(formData);
  
      // Update the user context with the new data
      updateUser(updatedUser);
  
      // Update the original data with the new form data
      setOriginalData(formData);
  
      // Exit edit mode
      setIsEditing(false);
  
      // Show a success message
      showToast('success', 'Profile updated successfully!');
    } catch (error) {
      // Handle errors
      showToast('error', error.message || 'An error occurred while updating the profile.');
      setError({ email: '', username: '', general: error.message || 'An error occurred while updating the profile.' });
    }
  };
  // Fields to exclude from the form (e.g., internal user data that shouldn't be edited)
  const excludedFields = ['lastLogin', 'isActive', 'role', 'updatedAt', 'createdAt', 'id', 'profilePicture', '_id', '__v'];

  return (
    <FormWrapper>
      <FormContainer>
        <Title>Profile</Title>
        <Form>
          {/* Profile picture section */}
          <ImageContainer center style={{ marginBottom: '10px' }}>
            <Image
              src={profilePicture}
              alt="Profile"
              width="100px"
              height="100px"
              borderRadius="50%"
            />
          </ImageContainer>
  
          {isEditing && ( // Show file input only in edit mode
            <FileInputContainer>
              <FileInputText>
                {formData.profilePicture && typeof formData.profilePicture === 'object'
                  ? formData.profilePicture.name // Display the uploaded file name
                  : 'No file chosen'}
              </FileInputText>
              <FileInputLabel htmlFor="profilePicture">
                <FileInputButton>Choose Profile Picture</FileInputButton>
              </FileInputLabel>
              <Input
                type="file"
                id="profilePicture"
                name="profilePicture"
                onChange={handleFileChange}
                accept="image/*"
                hidden
              />
            </FileInputContainer>
          )}
  
          {/* Dynamically render form fields for user data */}
          {Object.entries(user).map(([key, value]) => (
            !excludedFields.includes(key) && ( // Exclude fields that shouldn't be edited
              <div key={key}>
                <FormLabel>{key}:</FormLabel>
                <Input
                  type={key === 'birthDate' ? 'date' : 'text'} // Use date input for birthDate
                  name={key}
                  value={formData[key] || ''}
                  onChange={handleInputChange}
                  disabled={!isEditing || key === 'birthDate'} // Disable fields when not editing or for specific keys
                />
              </div>
            )
          ))}
  
          {/* Render Edit/Save/Cancel buttons based on edit mode */}
          {!isEditing ? (
            <Button type="button" onClick={handleEdit}>Edit</Button> // Show Edit button when not in edit mode
          ) : (
            <>
              <Button type="button" onClick={handleSave}>Save</Button> {/* Show Save and Cancel buttons in edit mode */}
              <Button type="button" onClick={handleCancel}>Cancel</Button>
            </>
          )}
        </Form>
      </FormContainer>
    </FormWrapper>
  );

}