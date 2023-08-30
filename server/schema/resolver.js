const { FunctionHall } = require("../models/FunctionHall");
var parseISO = require('date-fns/parseISO');
var formatISO = require('date-fns/formatISO');
const resolvers = {
    Query: {
        halls: async () => {
            let data = await FunctionHall.find({});
            return data;
        },
        price: async (_, args) => {
            let newdate, ISODate;
            if (args.date !== undefined) {
                newdate = formatISO(new Date(args.date))
                ISODate = newdate.substring(0, 11).concat("18:30:00.000Z");
            }
            const query = {
                'price': { $gte: args.price || 0 },
                'location.city': args.location.city || /./,
                'location.state': args.location.state || /./
            }
            if (args.date)
                query.bookings = { $not: { $elemMatch: { $eq: new Date(ISODate) } } }

            let data = await FunctionHall.find(query);
            return data;
        },
        hall: async (_, args) => {
            let data = await FunctionHall.findOne({ _id: args.id });
            return data;
        },
        searchHall: async (_, args) => {
            console.log("name ", args.name);
            let data = await FunctionHall.find({ name: {$regex: args.name, $options: 'i'} });
            return data;
        }
    },

    Mutation: {
        addDate: async (_, args) => {
            let ISODate = formatISO(parseISO(args.input.date));
            let data = await FunctionHall.updateOne({ _id: args.input.id }, { $push: { bookings: ISODate } });
            return data.acknowledged;
        }
    }
}

module.exports = { resolvers };

