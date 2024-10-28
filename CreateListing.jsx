import "../style/CreateListing.scss";
import variables from "../style/variables.scss"
import Navbar from "../components/Navbar";
import { categories, types, facilities } from "../data";
import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { IoIosImages } from "react-icons/io";
import { useState, useCallback } from "react";
import { BiTrash } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SiteFooter from "../components/SiteFooter";


const CreateListing = () => {
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [formLocation, setFormLocation] = useState({
    streetAddress: "",
    aptSuite: "",
    city: "",
    province: "",
    country: "",
  });
  const [guestCount, setGuestCount] = useState(1);
  const [bedroomCount, setBedroomCount] = useState(1);
  const [bedCount, setBedCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [amenities, setAmenities] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [formDescription, setFormDescription] = useState({
    title: "",
    description: "",
    highlight: "",
    highlightDesc: "",
    price: 0,
  });

  const creatorId = useSelector((state) => state.user._id);
  const navigate = useNavigate();

  const handleChangeLocation = (e) => {
    const { name, value } = e.target;
    setFormLocation((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectAmenities = useCallback((facility) => {
    setAmenities((prev) =>
      prev.includes(facility) ? prev.filter((item) => item !== facility) : [...prev, facility]
    );
  }, []);

  const handleUploadPhotos = (e) => {
    const newPhotos = Array.from(e.target.files);
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };

  const handleDragPhoto = (result) => {
    if (!result.destination) return;

    const items = Array.from(photos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setPhotos(items);
  };

  const handleRemovePhoto = (indexToRemove) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, index) => index !== indexToRemove));
  };

  const handleChangeDescription = (e) => {
    const { name, value } = e.target;
    setFormDescription((prev) => ({ ...prev, [name]: value }));
  };

  const handlePost = async (e) => {
    e.preventDefault();
    const listingForm = new FormData();
    listingForm.append("creator", creatorId);
    listingForm.append("category", category);
    listingForm.append("type", type);
    listingForm.append("streetAddress", formLocation.streetAddress);
    listingForm.append("aptSuite", formLocation.aptSuite);
    listingForm.append("city", formLocation.city);
    listingForm.append("province", formLocation.province);
    listingForm.append("country", formLocation.country);
    listingForm.append("guestCount", guestCount);
    listingForm.append("bedroomCount", bedroomCount);
    listingForm.append("bedCount", bedCount);
    listingForm.append("bathroomCount", bathroomCount);
    listingForm.append("amenities", amenities);
    listingForm.append("title", formDescription.title);
    listingForm.append("description", formDescription.description);
    listingForm.append("highlight", formDescription.highlight);
    listingForm.append("highlightDesc", formDescription.highlightDesc);
    listingForm.append("price", formDescription.price);

    photos.forEach((photo) => {
      listingForm.append("listingPhotos", photo);
    });

    try {
      const response = await fetch("http://localhost:3001/properties/create", {
        method: "POST",
        body: listingForm,
      });

      if (!response.ok) throw new Error('Failed to create listing');
      navigate("/");
    } catch (err) {
      console.error("Publish Listing failed", err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="create-listing">
        <h1>Publish Your Place</h1>
        <form onSubmit={handlePost}>
          <div className="create-listing_step1">
            <h2>Step 1: Tell us about your place</h2>
            <hr />
            <h3>Which of these categories best describes your place?</h3>
            <div className="category-list">
              {categories?.map((item, index) => (
                <div
                  className={`category ${category === item.label ? "selected" : ""}`}
                  key={index}
                  onClick={() => setCategory(item.label)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' ? setCategory(item.label) : null)}
                >
                  <div className="category_icon">{item.icon}</div>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>

            {/* Type Selection */}
            <h3>What type of place will guests have?</h3>
            <div className="type-list">
              {types?.map((item, index) => (
                <div
                  className={`type ${type === item.name ? "selected" : ""}`}
                  key={index}
                  onClick={() => setType(item.name)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' ? setType(item.name) : null)}
                >
                  <div className="type_text">
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                  </div>
                  <div className="type_icon">{item.icon}</div>
                </div>
              ))}
            </div>

            {/* Location Inputs */}
            <h3>Where's your place located?</h3>
            <div className="full">
              <div className="location">
                <p>Street Address</p>
                <input
                  type="text"
                  placeholder="Street Address"
                  name="streetAddress"
                  value={formLocation.streetAddress}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>
            <div className="half">
              <div className="location">
                <p>Apartment, Suite, etc. (if applicable)</p>
                <input
                  type="text"
                  placeholder="Apt, Suite, etc. (if applicable)"
                  name="aptSuite"
                  value={formLocation.aptSuite}
                  onChange={handleChangeLocation}
                />
              </div>
              <div className="location">
                <p>City</p>
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  value={formLocation.city}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>
            <div className="half">
              <div className="location">
                <p>Province</p>
                <input
                  type="text"
                  placeholder="Province"
                  name="province"
                  value={formLocation.province}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
              <div className="location">
                <p>Country</p>
                <input
                  type="text"
                  placeholder="Country"
                  name="country"
                  value={formLocation.country}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>

            {/* Guest Count, Bedroom Count, etc. */}
            <h3>Share some basics about your place</h3>
            <div className="basics">
              {[
                { label: "Guests", count: guestCount, setCount: setGuestCount },
                { label: "Bedrooms", count: bedroomCount, setCount: setBedroomCount },
                { label: "Beds", count: bedCount, setCount: setBedCount },
                { label: "Bathrooms", count: bathroomCount, setCount: setBathroomCount },
              ].map((item, index) => (
                <div className="basic" key={index}>
                  <p>{item.label}</p>
                  <div className="basic_count">
                    <RemoveCircleOutline
                      onClick={() => item.count > 1 && item.setCount(item.count - 1)}
                    />
                    <p>{item.count}</p>
                    <AddCircleOutline
                      onClick={() => item.setCount(item.count + 1)}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Amenities Selection */}
            <h3>What amenities do you offer?</h3>
            <div className="amenities-list">
              {facilities?.map((facility, index) => (
                <div
                  className={`amenity ${amenities.includes(facility) ? "selected" : ""}`}
                  key={index}
                  onClick={() => handleSelectAmenities(facility)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' ? handleSelectAmenities(facility) : null)}
                >
                  <p>{facility}</p>
                </div>
              ))}
            </div>

            {/* Photo Upload */}
            <h3>Upload photos of your place</h3>
            <div className="upload-container">
              <label htmlFor="file-upload">
                <IoIosImages />
                <p>Choose photos</p>
              </label>
              <input
                id="file-upload"
                type="file"
                multiple
                accept="image/*"
                onChange={handleUploadPhotos}
                style={{ display: "none" }}
              />
              {photos.length > 0 && (
                <DragDropContext onDragEnd={handleDragPhoto}>
                  <Droppable droppableId="droppable-photos">
                    {(provided) => (
                      <div
                        className="photos-list"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {photos.map((photo, index) => (
                          <Draggable key={photo.name} draggableId={photo.name} index={index}>
                            {(provided) => (
                              <div
                                className="photo"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <img src={URL.createObjectURL(photo)} alt="Uploaded" />
                                <BiTrash onClick={() => handleRemovePhoto(index)} />
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              )}
            </div>
          </div>

          {/* Description and Price Input */}
          <div className="create-listing_step2">
            <h2>Step 2: Add a title and description</h2>
            <hr />
            <div className="description">
              <h3>Title</h3>
              <input
                type="text"
                name="title"
                value={formDescription.title}
                onChange={handleChangeDescription}
                required
              />
            </div>
            <div className="description">
              <h3>Description</h3>
              <textarea
                name="description"
                value={formDescription.description}
                onChange={handleChangeDescription}
                required
              />
            </div>
            <div className="description">
              <h3>Highlight</h3>
              <input
                type="text"
                name="highlight"
                value={formDescription.highlight}
                onChange={handleChangeDescription}
              />
            </div>
            <div className="description">
              <h3>Highlight Description</h3>
              <textarea
                name="highlightDesc"
                value={formDescription.highlightDesc}
                onChange={handleChangeDescription}
              />
            </div>
            <div className="description">
              <h3>Price per Night</h3>
              <input
                type="number"
                name="price"
                value={formDescription.price}
                onChange={handleChangeDescription}
                min="0"
                required
              />
            </div>
          </div>

          <button type="submit" className="submit-button">Publish Listing</button>
        </form>
      </div>
      <SiteFooter />
    </>
  );
};

export default CreateListing;
