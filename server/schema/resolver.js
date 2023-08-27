const { FunctionHall } = require("../models/FunctionHall");
var getISODay = require('date-fns/getISODay');
var parseISO = require('date-fns/parseISO');
var add = require('date-fns/add');
var formatISO = require('date-fns/formatISO');
const resolvers = {
    Query: {
        hello: () => "hello",
        halls: async () => {
            let data = await FunctionHall.find({});
            return data;
        },
        price: async (parent, args) => {
            let newdate
            if(args.date !== undefined){
            newdate = formatISO( parseISO( args.date || new Date()))}
            const query = {
                'price': { $gt:  args.price || 0 },
                'location.city':  args.location.city || /./,
                'location.state':  args.location.state || /./,
                
            }
            if(args.date)
                query.bookings = { $not: { $elemMatch: { $eq:  newdate } } }
            
            let data = await FunctionHall.find(query);
            console.log(data);
            return data;
        },
        hall: async (parent, args) => {
            let data = await FunctionHall.findOne({ _id: args.id });
            return data;
        },
        searchHall: async (_, args) => {
            let data = await FunctionHall.find({ name: new RegExp(`/.*${args.name}.*/`,"i")  })
            console.log(data);
            return data;
        }
    },

    Mutation: {
        addDate: async (parent, args) => {
            let isodate = formatISO( parseISO( args.input.date))
            console.log(isodate);
            let doc = await FunctionHall.updateOne({ _id: args.input.id }, { $push: { bookings: isodate } })
            console.log(doc);
            return doc.acknowledged;
        }
    }

}

module.exports = { resolvers };


// d-flex w-75  align-items-center flex-wrap justify-content-start 