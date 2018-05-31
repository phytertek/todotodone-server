const { hashPassword, comparePassword } = require('./utils/bcrypt');
const { Types } = require('enmapi/database/utils');
const { todayPlusNDays } = require('enmapi/common/timeDate');

module.exports = {
  User: {
    Schema: {
      firstName: String,
      lastName: String,
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      activeTokens: [{ type: Types.ObjectId, ref: 'Token' }]
    },
    Hooks: User => {
      User.pre('save', async function handlePreSaveHooks(next) {
        try {
          const user = this;

          if (user.isModified('email')) {
            user.email = user.email.toLowerCase();
          }

          if (user.isModified('password')) {
            user.password = await hashPassword(user.password);
          }

          return next();
        } catch (error) {
          throw new Error(error);
        }
      });
    },
    Methods: User => {
      User.methods.checkPassword = async function handleCheckPasswordMethod(
        password
      ) {
        try {
          const user = this;
          const passwordMatch = await comparePassword(password, user.password);
          return passwordMatch;
        } catch (error) {
          throw new Error(error);
        }
      };
    }
  },
  Token: {
    Schema: {
      created_date: {
        type: Date,
        required: true,
        default: Date.now()
      },
      source: { type: Object, required: true },
      user: { type: Types.ObjectId, ref: 'User' },
      token: { type: String, required: true, unique: true },
      expire_date: {
        type: Date,
        required: true,
        default: todayPlusNDays(2)
      }
    }
  }
};
