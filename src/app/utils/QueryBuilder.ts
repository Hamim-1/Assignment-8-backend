import { Query } from "mongoose";
import { excluededFields } from "../constans";

export class QueryBuilder<T> {
    public modelQuery: Query<T[], T>;
    public query: Record<string, string>;
    constructor(modelQuery: Query<T[], T>, query: Record<string, string>) {
        this.modelQuery = modelQuery;
        this.query = query;
    }

    filter() {
        const filter = { ...this.query };
        for (const field of excluededFields) {
            delete filter[field]
        }
        this.modelQuery = this.modelQuery.find(filter);
        return this;
    }

    filterByPrice() {

        if (this.query.minPrice || this.query.maxPrice) {
            const priceQuery: Record<string, any> = {};
            if (this.query.minPrice) {
                priceQuery.$gte = Number(this.query.minPrice);
            }


            if (this.query.maxPrice) {
                priceQuery.$lte = Number(this.query.maxPrice);
            }

            this.modelQuery = this.modelQuery.find({
                price: priceQuery,
            });
        }

        return this;
    }

    search(searchableFields: string[]) {
        const search = this.query.search;
        let words: string[];
        if (search) {
            words = search.split(" ").filter(Boolean);
            words.unshift(search);
        }

        if (search) {
            const searchQuery = {
                $or: searchableFields.flatMap(field =>
                    words.map((word: string) => ({
                        [field]: { $regex: word, $options: "i" }
                    }))
                ),
            };

            this.modelQuery = this.modelQuery.find(searchQuery);
        }
        return this;
    }



    sort() {
        const sort = this.query.sort || "-createdAt";
        this.modelQuery = this.modelQuery.sort(sort);
        return this;
    }

    paginate() {
        const page = Number(this.query.page) || 1;
        const limit = Number(this.query.limit) || 12;
        const skip = (page - 1) * limit;
        this.modelQuery = this.modelQuery.limit(limit).skip(skip);
        return this;
    }
    build() {
        return this.modelQuery;
    }

    async getMeta() {
        const totalDocuments = await this.modelQuery.clone().countDocuments()

        const page = Number(this.query.page) || 1
        const limit = Number(this.query.limit) || 12;

        const totalPage = Math.ceil(totalDocuments / limit)

        return { page, limit, total: totalDocuments, totalPage }
    }

}