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
} from '../../styles/GlobalStyles'; // Import styled components for the form

export default function Profile() {
  const { user } = useAuth(); // Get the current user data from the authentication context
  const [isEditing, setIsEditing] = useState(false); // State to track if the profile is in edit mode
  const [formData, setFormData] = useState({
    ...user,
    birthDate: user.birthDate ? new Date(user.birthDate).toISOString().split('T')[0] : '', // Format birth date to 'YYYY-MM-DD' for the date input
  });
  const [originalData, setOriginalData] = useState({
    ...user,
    birthDate: user.birthDate ? new Date(user.birthDate).toISOString().split('T')[0] : '', // Store the original user data to revert changes if needed
  });
  const [profilePicture, setProfilePicture] = useState(user.profilePicture || 'default-avatar.png'); // State for the profile picture, defaulting to a placeholder if none exists

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
    setProfilePicture(user.profilePicture || 'default-avatar.png'); // Reset profile picture
    setIsEditing(false); // Exit edit mode
  };

  // Save changes (currently logs data to the console)
  const handleSave = () => {
    // Here you can handle the request to save the data (e.g., API call)
    console.log('Dados salvos:', { ...formData, profilePicture }); // Log the updated data
    setOriginalData(formData); // Update the original data with the new form data
    setIsEditing(false); // Exit edit mode
  };

  // Fields to exclude from the form (e.g., internal user data that shouldn't be edited)
  const excludedFields = ['lastLogin', 'isActive', 'role', 'updatedAt', 'createdAt', 'id', 'profilePicture'];

  return (
    <FormWrapper>
      <FormContainer>
        <Title>Profile</Title>
        <Form>
          {/* Profile picture section */}
          <FormLabel>
            <img src={profilePicture} alt="Profile" width={100} height={100} style={{ borderRadius: '50%', marginBottom: '10px' }} />
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
          </FormLabel>

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
            <Button type="button" onClick={handleEdit}>Editar</Button> // Show Edit button when not in edit mode
          ) : (
            <>
              <Button type="button" onClick={handleSave}>Salvar</Button> {/* Show Save and Cancel buttons in edit mode */}
              <Button type="button" onClick={handleCancel}>Cancelar</Button>
            </>
          )}
        </Form>
      </FormContainer>
    </FormWrapper>
  );
}