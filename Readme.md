
# Crypto Outlook

## Description
The dashboard page displays various widgets showing prices of different cryptocurrencies along with other useful trading data. Users can remove unwanted items from the list to focus on specific items.

## Features

### Dashboard
The Dashboard features two columns of sections, each containing widgets that present cryptocurrency information in different, useful ways. The design is responsive, meaning it automatically adjusts to a single-column layout on mobile devices.

### Live Crypto Prices Widget
The first section in the first row displays a widget with various cryptocurrencies. Users can remove individual items from this list if they are not needed.

## Project Architecture
The entire project is built using Angular 15.

### Dashboard - Angular
The Dashboard is the main Angular component. It is structured into three rows and two columns using a flex design, with each box containing a single widget or component. The design is responsive, converting to a single column on mobile devices.

### Datatable Component - React
Within the react-component directory, there is a datatable component (`datatable.react.component.tsx`) that displays crypto prices in a table format. It allows users to remove records from the table, with user actions being passed to the host components along with the selected ticker data.

### Wrapper Component for React Datatable
There is a wrapper component (`datatable-wrapper.component`) for the above React component, providing a cleaner interface for other components.

The dashboard component acts as the host, embedding the wrapper component, passing data through parameters, and handling user removal actions.

### Crypto Data Provider Service
Located in `common/services`, the `crypto-data-provider` service allows components to subscribe to live data from the Coinbase API to fetch live crypto prices. The dashboard subscribes to this service to receive real-time data for a predefined set of tickers.

## Data Workflow

### Loading Crypto Prices

1. The Dashboard loads and establishes a WebSocket connection using the `crypto-data-provider` service with a list of tickers.
2. The Dashboard filters the data, creates a single list with updated ticker prices, and passes it to the `datatable-wrapper` component.
3. The `datatable-wrapper` component forwards the data to the React-based datatable component.
4. The React datatable displays the data in a table format.

### Removing Crypto Items
1. Clicking the remove button in the React datatable emits an event with the ticker value, handled by the wrapper component.
2. The wrapper component emits another event, handled by the host dashboard page.
3. The dashboard page removes the item from the tickers list and data list, then re-establishes the connection using the data provider service with the updated tickers list.

## Installation and Running Guide

### Installation
1. Navigate to the project directory using the command prompt.
2. Run `npm install`.

### Running the Project
1. Install the Angular CLI globally `npm install -g @angular/cli`
   
2. Run the project using this command `ng serve`
