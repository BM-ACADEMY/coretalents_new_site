import mongoose from 'mongoose';

export const TYPES = ['image', 'content'];
export const TRIGGERS = ['exit', 'timer'];
export const EFFECTS = ['none', 'cannons', 'burst', 'rain', 'fireworks'];

const popupSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },      // admin-only label
  type: { type: String, enum: TYPES, required: true },
  active: { type: Boolean, default: false },
  trigger: { type: String, enum: TRIGGERS, default: 'exit' }, // exit intent (desktop) or after a delay
  delay: { type: Number, default: 5 },                        // seconds, for trigger = timer
  effect: { type: String, enum: EFFECTS, default: 'none' },  // confetti-style animation when it opens

  // image popup - the whole image is the link
  image: { type: String, default: '' },                       // file name inside UPLOAD_DIR
  imageAlt: { type: String, default: '', trim: true },
  width: { type: Number, default: 480 },                      // display box in px; image is cropped to fill it
  height: { type: Number, default: 600 },
  linkUrl: { type: String, default: '', trim: true },

  // content popup
  heading: { type: String, default: '', trim: true },
  body: { type: String, default: '', trim: true },
  buttonLabel: { type: String, default: '', trim: true },
  buttonUrl: { type: String, default: '', trim: true },
}, { timestamps: true });

function shape(p) {
  return {
    id: String(p._id),
    name: p.name,
    type: p.type,
    trigger: p.trigger,
    delay: p.delay,
    effect: p.effect || 'none',
    imageUrl: p.image ? `/uploads/${p.image}` : '',
    imageAlt: p.imageAlt,
    width: p.width,
    height: p.height,
    linkUrl: p.linkUrl,
    heading: p.heading,
    body: p.body,
    buttonLabel: p.buttonLabel,
    buttonUrl: p.buttonUrl,
  };
}

// what the public site gets
popupSchema.methods.toPublic = function toPublic() { return shape(this); };

// what the admin panel gets
popupSchema.methods.toAdmin = function toAdmin() {
  return { ...shape(this), active: this.active, createdAt: this.createdAt, updatedAt: this.updatedAt };
};

export default mongoose.model('Popup', popupSchema);
