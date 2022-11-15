import prisma from '../db';

export const getOneUpdate = async (req, res, next) => {
  try {
    const update = await prisma.update.findUnique({
      where: {
        id: req.params.id,
      },
    });

    res.json({ data: update });
  } catch (error) {
    error.type = 'auth';
    next(error);
  }
};

export const getUpdates = async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        belongsToId: req.user.id,
      },
      include: {
        updates: true,
      },
    });

    //this bit should really not need to be done after querying db, might be an idea to change the schema
    const updates = products.reduce((allUpdates, product) => {
      return [...allUpdates, product.updates];
    }, []);

    res.json({ data: updates });
  } catch (error) {
    error.type = 'auth';
    next(error);
  }
};

// export const createUpdate = async (req, res) => {
//   const product = await prisma.product.findUnique({
//     where: {
//       id: req.body.productId,
//     },
//   });
//   if (!product) {
//     //doesn't belong to user
//     return res.json({ message: 'nope' });
//   }
//   const update = await prisma.update.create({
//     data: {
//       title: req.body.title,
//       body: req.body.body,
//       product: { connect: { id: product.id } },
//     },
//   });
//   res.json({ data: update });
// };
export const createUpdate = async (req, res, next) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: req.body.productId,
      },
    });
    if (!product) {
      //doesn't belong to user
      return res.json({ message: 'nope' });
    }
    const update = await prisma.update.create({
      data: req.body,
    });
    res.json({ data: update });
  } catch (error) {
    next(error);
  }
};

export const updateUpdate = async (req, res, next) => {
  try {
    //finds products belonging to user
    const products = await prisma.product.findMany({
      where: {
        belongsToId: req.user.id,
      },
      include: {
        updates: true,
      },
    });

    //collects all updates
    const updates = products.reduce((allUpdates, product) => {
      return [...allUpdates, product.updates];
    }, []);

    //checks if product and update belong to same user
    const match = updates.find((update) => update.id === req.params.id);

    if (!match) {
      res.json({ message: 'product does not belong to user' });
    }

    const updatedUpdate = await prisma.update.update({
      where: {
        id: req.params.id,
      },
      data: req.body,
    });

    res.json({ data: updatedUpdate });
  } catch (error) {
    error.type = 'auth';
    next(error);
  }
};

export const deleteUpdate = async (req, res, next) => {
  try {
    //finds products belonging to user
    const products = await prisma.product.findMany({
      where: {
        belongsToId: req.user.id,
      },
      include: {
        updates: true,
      },
    });

    //collects all updates
    const updates = products.reduce((allUpdates, product) => {
      return [...allUpdates, product.updates];
    }, []);

    //checks if product and update belong to same user
    const match = updates.find((update) => update.id === req.params.id);

    if (!match) {
      res.json({ message: 'product does not belong to user' });
    }

    const deleted = await prisma.update.delete({
      where: {
        id: req.params.id,
      },
    });

    res.json({ data: deleted });
  } catch (error) {
    error.type = 'auth';
    next(error);
  }
};
