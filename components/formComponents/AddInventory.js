import axios from 'axios'
import React from 'react'
import { Formik } from 'formik';
// require("dotenv").config({})

export const AddInventory = () => {
  const initialState = {
    name: '', brand: '', price: '', categories: [], image: '', description: '', currentInventory: ''
  }
  const widget = window.cloudinary.createUploadWidget(
    {
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
      uploadPreset: "gfdvmfqu",
      styles: {
        palette: {
          window: '#E5E8EB',
          windowBorder: '#4A4A4A',
          tabIcon: '#000000',
          textDark: '#fff',
          textLight: '#FFFFFF',
          link: '#44c767',
          action: '#FF620C',
          inactiveTabIcon: '#4c5d73',
          error: '#F44235',
          inProgress: '#44c767',
          complete: '#20B832',
          sourceBg: '#fff'
        },
        fonts: {
          Roboto: 'https://fonts.googleapis.com/css?family=Roboto'
        }
      }
    },
    (error, result) => {
      if(!error && result.event === "success") {
        console.log(result.info);
      }
      else {
        console.log(error);
      }
    }
  )

  const handleUploadClick = () => {
    widget.open()
  }

  return (
    <div>
      <h3 className="text-3xl">Add Item</h3>
      <div className="flex flex-1 justify-center">
        <div className="w-full max-w-144">
          <Formik
            initialValues={initialState}
            onSubmit={async(values, { resetForm }) => {
              console.log(values);
              if (!values.name || !values.brand || !values.price || !values.categories.length || !values.description || !values.currentInventory || !values.image) return
            // add to database
            const res = await axios.post("/.netlify/functions/myStore", JSON.stringify(values), {
              headers: {
                "fieldName": "addProductInInventory"
              }
            })
            const { data } = res
            // console.log(data.ref["@ref"].id);
              resetForm({
                values: initialState,
              });


            }}
          >
            {({ values, handleSubmit, handleChange, resetForm }) => (
              <form className="bg-white shadow-xs rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Item name
                  </label>
                  <input
                    name="name"
                    onChange={handleChange}
                    value={values.name} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Item name" name="name" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                    Item price
                  </label>
                  <input
                    name="price"
                    onChange={handleChange}
                    value={values.price} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="price" type="text" placeholder="Item price" name="price" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                    Item Description
                  </label>
                  <input
                    name="description"
                    onChange={handleChange}
                    value={values.description} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="description" placeholder="Item Description" name="description" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="item image">
                    Item image
                  </label>
                  <button type="button" onClick={handleUploadClick}>
                    upload
                  </button>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currentInventory">
                    In stock
                  </label>
                  <input
                    name="currentInventory"
                    onChange={handleChange}
                    value={values.currentInventory} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="currentInventory" placeholder="Items in stock" name="currentInventory" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categories">
                    Item categories
                  </label>
                  <input
                    name="categories"
                    onChange={handleChange}
                    value={values.categories} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="categories" placeholder="Comma separated list of item categories" name="categories" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="brand">
                    Item brand
                  </label>
                  <input
                    name="brand"
                    onChange={handleChange}
                    value={values.brand} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="brand" placeholder="Item brand" name="brand" />
                </div>
                <div className="flex items-center justify-between mt-4">
                  <button type="submit" className="bg-primary hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Add Item
                  </button>
                  <a onClick={resetForm} className="inline-block align-baseline font-bold text-sm" href="#">
                    Clear Form
                  </a>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default AddInventory