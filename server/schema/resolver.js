const { FunctionHall } = require("../models/FunctionHall");
var parseISO = require('date-fns/parseISO');
var formatISO = require('date-fns/formatISO');
const { startOfDay, endOfDay } = require("date-fns");
const resolvers = {
    Query: {
        hello: () => "hello",
        halls: async () => {
            let data = await FunctionHall.find({});
            return data;
        },
        price: async (parent, args) => {
            let newdate, startDateStr,endDateStr
            if (args.date !== undefined) {
                newdate = formatISO(new Date(args.date))
                startDateStr = newdate.substring(0,11).concat("18:30:00.000Z");
                endDateStr = new Date(startDateStr)
                console.log(startDateStr,endDateStr)
            }
            console.log(newdate)
            const query = {
                'price': { $gt: args.price || 0 },
                'location.city': args.location.city || /./,
                'location.state': args.location.state || /./
            }
            if (args.date)
                query.bookings = { $not: { $elemMatch: { $eq: new Date(startDateStr) } } }

            let data = await FunctionHall.find(query);
            // console.log(data);
            return data;
        },
        hall: async (parent, args) => {
            let data = await FunctionHall.findOne({ _id: args.id });
            return data;
        },
        searchHall: async (_, args) => {
            console.log("name ", args.name);
            let data = await FunctionHall.find({ name: new RegExp(args.name, 'i') })
            console.log(data);
            return data;
        }
    },

    Mutation: {
        addDate: async (parent, args) => {
            let isodate = formatISO(parseISO(args.input.date))
            console.log(isodate);
            let doc = await FunctionHall.updateOne({ _id: args.input.id }, { $push: { bookings: isodate } })
            console.log(doc);
            return doc.acknowledged;
        }
    }

}

module.exports = { resolvers };

